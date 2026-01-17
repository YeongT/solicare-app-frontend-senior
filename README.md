# Solicare App Frontend (Senior)

건강 관리 플랫폼의 프론트엔드 애플리케이션입니다. 식사, 운동, 약 복용, 채팅 등 다양한 건강 관리 기능을 제공합니다.

## 🛠️ 기술 스택
- React (TypeScript)

## 📦 폴더 구조
```
src/
  components/         # UI 및 페이지별 컴포넌트
  contexts/           # 전역 상태 관리 (AuthContext 등)
  data/               # 목업 데이터
  hooks/              # 커스텀 훅
  pages/              # 주요 페이지 컴포넌트
  styles/             # 글로벌/페이지별 스타일
  types/              # 타입 정의
  utils/              # 유틸리티 함수
public/               # 정적 파일
```

## 🚀 설치 및 실행
1. 의존성 설치
   ```bash
   yarn install
   ```
2. 개발 서버 실행
   ```bash
   yarn start
   ```
3. 빌드
   ```bash
   yarn run build
   ```

## 🖥️ 주요 기능
- 회원가입/로그인/로그아웃
- 대시보드: 오늘의 식사, 운동, 약 복용 현황
- 식사/운동/약 복용 기록 및 관리
- 채팅 페이지
- 반응형 UI

## 📝 환경 변수
- 필요시 `.env` 파일에 환경 변수 설정

## 🤝 기여 방법
1. 이슈 등록 및 포크
2. 브랜치 생성 후 작업
3. PR 요청

## 📄 라이선스
MIT License

## 🚢 도커(Nginx)로 배포

이 저장소는 정적 빌드 결과물을 nginx로 서빙하도록 도커 환경을 제공하며, 로컬 또는 서버에서 빠르게 배포할 수 있습니다. 기본 포트는 8150입니다.

옵션 A — 간단 배포 (로컬 `build/` 폴더 바인드 마운트)
1. 빌드:
   ```bash
   npm run build
   ```
2. 도커 컴포즈로 실행:
   ```bash
   docker-compose up -d --build
   ```
3. 브라우저 또는 curl로 확인:
   ```bash
   curl http://localhost:8150
   ```

옵션 B — 호스트 경로에 배포 (서버의 `/storage/web/solicare/html/app/` 사용)
- `docker-compose.yml`의 volumes에서 주석 처리된 호스트 절대 경로 라인을 활성화하세요.
- 호스트에서 빌드 결과를 해당 경로로 복사합니다:
  ```bash
  npm run build
  cp -r build/* /storage/web/solicare/html/app/
  ```
- 도커 컴포즈 실행:
  ```bash
  docker-compose up -d
  ```

옵션 C — 이미지에 빌드 결과 포함 (CI/CD 권장)
- 멀티스테이지 `Dockerfile`이 제공됩니다. CI에서 다음과 같이 이미지 빌드/배포하세요:
  ```bash
  docker build -t solicare-frontend:latest .
  docker run -d --name solicare-nginx -p 8150:80 solicare-frontend:latest
  ```

### Health-check 기반 안전 배포(서버용 스크립트)

리포지토리에 `scripts/deploy_with_healthcheck.sh` 스크립트가 추가되어 있습니다. 이 스크립트는 다음 흐름을 따릅니다:
1. `npm run build`로 빌드
2. 빌드 결과를 임시 디렉터리에 복사
3. 임시 nginx 컨테이너를 띄워 health check 수행
4. health check가 통과하면 프로덕션 디렉터리(`/storage/web/solicare/html/app/` 기본)에 atomically 반영(`rsync --delete` 사용)

사용 예 (리눅스 서버에서 권장):
```bash
# 실행 권한 부여 (서버에서 한 번만)
chmod +x scripts/deploy_with_healthcheck.sh

# 기본 실행 (환경변수로 오버라이드 가능)
# 예: PROD_DIR=/storage/web/solicare/html/app CHECK_PORT=8181 ./scripts/deploy_with_healthcheck.sh
./scripts/deploy_with_healthcheck.sh
```

환경변수 (선택)
- PROD_DIR: 프로덕션 정적 파일 위치 (기본 `/storage/web/solicare/html/app`)
- CHECK_PORT: 임시 nginx 컨테이너를 바인딩할 포트(기본 `8181`) — 방화벽/포트 사용 현황에 따라 변경
- CHECK_PATH: 헬스체크 경로 (기본 `/`)
- CHECK_TIMEOUT: 헬스체크 타임아웃(초, 기본 `30`)

Windows에서 사용
- 스크립트는 Bash용입니다. Windows에서는 WSL2 또는 Git Bash에서 실행하거나, PowerShell용으로 변환해 사용하세요.

주의: 스크립트는 서버 측에서 실행하도록 설계되었습니다. 호스트의 파일을 덮어쓰기 때문에 서버 권한/백업에 주의하세요.

편의 스크립트
- `npm run deploy:docker` — 로컬 빌드 후 `docker-compose up -d --build`를 실행합니다.

검증 방법
- 정적 파일 확인: `curl -I http://localhost:8150` → `200 OK` 및 `Content-Type: text/html` 확인
- SPA 라우팅 확인: `curl http://localhost:8150/some/path`가 `index.html` 내용을 반환하는지 확인
