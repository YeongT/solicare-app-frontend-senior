#!/usr/bin/env bash
set -euo pipefail

# deploy_with_healthcheck.sh
# 간단한 health-check 기반 배포 스크립트 (서버 측용)
# 동작 요약:
# 1) 로컬에서 npm run build 실행
# 2) 빌드 결과를 임시 디렉터리에 복사
# 3) 임시 nginx 컨테이너로 health check 실행
# 4) 성공하면 production 디렉터리에 rsync로 반영하고 nginx 컨테이너를 재시작

# 설정(필요시 환경변수로 오버라이드 가능)
BUILD_CMD="yarn build"
PROD_DIR="${PROD_DIR:-/storage/web/solicare/html/app}"
TMP_DIR="$(mktemp -d /tmp/solicare_build.XXXX)"
CHECK_PORT="${CHECK_PORT:-8181}"
CHECK_PATH="${CHECK_PATH:-/}"
CHECK_TIMEOUT="${CHECK_TIMEOUT:-30}"
NGINX_CHECK_CONTAINER="solicare-check-$$"

echo "[deploy] 시작: 임시 디렉터리=$TMP_DIR, 프로덕션 디렉터리=$PROD_DIR"

# 1) 빌드
echo "[deploy] 빌드 실행: $BUILD_CMD"
$BUILD_CMD

# 2) 빌드 결과를 임시 디렉터리로 복사
echo "[deploy] 빌드 결과 복사 -> $TMP_DIR"
rm -rf "$TMP_DIR"/* || true
cp -r build/* "$TMP_DIR/"

# 종료시 정리
cleanup() {
  echo "[deploy] 정리: 임시 컨테이너/디렉터리 제거"
  docker rm -f "$NGINX_CHECK_CONTAINER" >/dev/null 2>&1 || true
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

# 3) 임시 nginx 컨테이너 띄우기
echo "[deploy] 임시 nginx 컨테이너 시작 (포트 $CHECK_PORT)"
docker run --rm -d --name "$NGINX_CHECK_CONTAINER" -p "${CHECK_PORT}:80" -v "$TMP_DIR":/usr/share/nginx/html:ro nginx:stable-alpine >/dev/null

# 4) health check 대기 및 확인
echo "[deploy] health check: http://127.0.0.1:${CHECK_PORT}${CHECK_PATH} (타임아웃 ${CHECK_TIMEOUT}s)"
for i in $(seq 1 "$CHECK_TIMEOUT"); do
  if curl -fsS "http://127.0.0.1:${CHECK_PORT}${CHECK_PATH}" > /dev/null 2>&1; then
    echo "[deploy] health check 성공"
    break
  fi
  echo "[deploy] 대기 중... ($i/$CHECK_TIMEOUT)"
  sleep 1
  if [ "$i" -eq "$CHECK_TIMEOUT" ]; then
    echo "[deploy] health check 실패: ${CHECK_TIMEOUT}초 경과"
    exit 1
  fi
done

# 5) 성공하면 프로덕션 디렉터리에 반영 (rsync 사용)
echo "[deploy] 프로덕션에 반영: $PROD_DIR (rsync 사용)"
mkdir -p "$PROD_DIR"
if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete "$TMP_DIR"/ "$PROD_DIR"/
else
  echo "[deploy] rsync 없음 — fallback으로 복사 수행"
  rm -rf "$PROD_DIR"/* || true
  cp -r "$TMP_DIR"/* "$PROD_DIR"/
fi

echo "[deploy] 완료 - 파일이 $PROD_DIR 에 배포됨"

