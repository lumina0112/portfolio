/* 사이트 콘텐츠. 순서를 바꾸면 목록 순서도 바뀐다.
   cat: ip(캐릭터) / video(AI 영상) / graphic(그래픽)
   kind: work(실무) / industry(산학 프로젝트) / class(수업과 공모전)
   statusType: unreleased(밝은 칩) / award(포인트 컬러) / 없으면 기본
   tone: 작업 카드 액자와 상세 팝업 배경색(대표 이미지 색을 어둡게 한 값)
   orgLabel: 상세 팝업에서 org 칸의 라벨. 없으면 "소속"
   steps[].img: 단계 이미지(기존 포트폴리오에서 추출), pipeline: 이미지 합성 과정
   video: 팝업의 영상 자리(16:9). src에 mp4 경로나 yt에 YouTube 영상 id를 적으면 그 자리에서 재생한다. poster, label, cap은 선택.
     영상이 여럿이면 { label, items: [{ src, poster, cap }, ...] }로 적어 한 구역에 나란히 놓는다
   order: 팝업 구역 순서(video, deck, res, flow, steps, pipeline, process, x:이름). x: 추가 구역 묶음. type은 list, pipe, scenes, phones, figs, chars, pairs
   process: 참조 자료 묶음. items의 세 번째 값 "tall"은 세로 이미지. images의 세 번째 값 "full"은 한 줄 전체 */

window.TOOLS = {
  higgsfield:  { name: "Higgsfield",       abbr: "Hf", rating: 5 },
  midjourney:  { name: "Midjourney",       abbr: "Mj", rating: 5 },
  kling:       { name: "Kling",            abbr: "Kl", rating: 5 },
  aistudio:    { name: "Google AI Studio", abbr: "Gs", rating: 5 },
  premiere:    { name: "Premiere Pro",     abbr: "Pr", rating: 5 },
  suno:        { name: "Suno",             abbr: "Su", rating: 5 },
  photoshop:   { name: "Photoshop",        abbr: "Ps", rating: 5 },
  illustrator: { name: "Illustrator",      abbr: "Ai", rating: 5 },
  indesign:    { name: "InDesign",         abbr: "Id", rating: 4 },
  figma:       { name: "Figma",            abbr: "Fg", rating: 4 },
  chatgpt:     { name: "ChatGPT",          abbr: "Cg", rating: 5 },
  claude:      { name: "Claude",           abbr: "Cl", rating: 5 },
  blender:     { name: "Blender",          abbr: "Bl", rating: 3 },
  /* 점수 없이 이름만 쓰는 툴 */
  gptimage:    { name: "GPT Image",        abbr: "Gi" },
  cursor:      { name: "Cursor",           abbr: "Cu" },
  /* Higgsfield 안에서 쓰는 모델. 팝업 칩으로만 쓴다(About 툴 표에는 넣지 않음) */
  seedance:    { name: "Seedance 2.5",     abbr: "Sd", rating: 5 },
  seedream:    { name: "Seedream 5.5",     abbr: "Sr", rating: 5 },
  /* 툴이 아닌 작업 방법. 점수 없이 칩으로만 쓴다 */
  drawing:     { name: "핸드 드로잉",       abbr: "Hd" }
};

window.PROJECTS = [
  {
    id: "imaginus", tone: "#241e21", no: "01",
    line: "img/line/imaginus.webp", thumb: "img/pre/imaginus-1.jpg",
    homeTitle: "NOWHERE", homeImg: "img/pre/imaginus-1.jpg", homePos: "50% 40%",
    title: "버추얼 아이돌 NOWHERE 프로젝트",
    org: "이매지너스", kindLabel: "실무 인턴십 6개월",
    period: "2025.12 – 2026.05", year: "2026",
    cat: ["ip", "video"], kind: "work",
    tags: ["외형 디자인", "스타일링", "프로모션", "드라마 제작"],
    status: "디즈니플러스 2026.12 공개 예정", statusType: "unreleased",
    locked: true, featured: true,
    episodes: [1, 2, 3, 5],
    summary: "4인조 버추얼 보이그룹 NOWHERE(노웨어)의 데뷔 프로젝트에 기획 단계부터 참여하였습니다. 멤버별 외형 디자인과 스타일링을 맡았고, 홍보 프로모션과 데뷔 과정을 다룬 OTT 드라마(전체 5화) 제작까지 진행하였습니다. 드라마에서는 1, 2, 3, 5화의 영상 생성과 가편집을 맡았고, 극 중 공간 에셋과 키아트도 제작하였습니다.",
    team: "제작사 기획, 연출, 미술, 편집 팀",
    role: "외형 디자인, 스타일링, AI 영상 제작",
    roles: ["멤버별 외형 디자인과 스타일링", "홍보 프로모션 제작", "드라마 1, 2, 3, 5화 영상 생성과 가편집", "공간 에셋과 키아트 제작"],
    resultsFirst: true, resultsLabel: "공개 예정 결과물",
    note: "툴에 새 기능이 나오면 바로 테스트하고, 회차 작업에 맞는 생성 방식을 정리하여 적용하였습니다.",
    steps: [
      { title: "캐릭터 디자인과 스타일링", items: ["멤버별 캐릭터 디자인과 에셋 제작", "회차와 장면에 맞춘 의상 스타일링", "Nano Banana Pro로 이미지 생성, 후반에는 GPT Image 사용"], tools: [["higgsfield", "이미지 생성"], ["photoshop", "합성, 보정"]] },
      { title: "공간 에셋과 키아트", items: ["극 중 공간 에셋 생성과 편집", "키아트 제작"], tools: [["higgsfield", "이미지 생성, 업스케일"], ["photoshop", "합성, 보정"]] },
      { title: "회차 영상 생성", items: ["1, 2, 3, 5화 장면 영상 생성", "Kling 2.0으로 시작하여 Kling 2.5 멀티샷, Cinema Studio 2.0, Seedance 2.0으로 차례로 전환"], tools: [["kling", "Kling 2.0, Kling 2.5 멀티샷"], ["higgsfield", "Cinema Studio 2.0, Seedance 2.0, MCP 연결"]] },
      { title: "가편집", items: ["생성한 컷으로 회차별 가편집", "Premiere Pro와 DaVinci Resolve를 함께 사용"], tools: [["premiere", "가편집"]] }
    ],
    popCover: "img/pre/imaginus-1.jpg",
    images: [
      ["img/pre/imaginus-1.jpg", "버추얼 아이돌 데뷔"],
      ["img/pre/nowhere-logo.jpg", "그룹명 NOWHERE"]
    ]
  },
  {
    id: "rescene", tone: "#241e21", no: "02",
    homeTitle: "WOORI × RESCENE", homeImg: "img/pre/rescene-1.jpg", homePos: "50% 50%",
    line: "img/line/rescene.webp", thumb: "img/pre/rescene-1.jpg",
    title: "우리은행 × 리센느 광고 시안",
    org: "광고 비딩 AI 시안 외주", kindLabel: "실무",
    period: "2026.11.11 – 11.14", year: "2026",
    cat: ["ip", "video"], kind: "work",
    tags: ["캐릭터 에셋", "스타일링", "AI 영상"],
    status: "비공개 진행 중", statusType: "unreleased",
    locked: true, timecode: "00:00:30:00",
    summary: "우리은행 광고 비딩에 쓰일 AI 시안 제작을 외주로 맡아 작업자로 참여하였습니다. 멤버별 얼굴을 유지한 캐릭터 에셋을 생성하고 광고 콘셉트에 맞춰 스타일링하였습니다. 시안 A는 인물 5명이 등장하는 30초 원테이크를 모델링과 애니메이션으로 설계하여 12시간 만에 완성하였고, 시안 B는 감독과 조감독의 피드백을 바로 반영하며 약 20시간 동안 제작하였습니다.",
    team: "외주 작업팀",
    role: "캐릭터 에셋, 스타일링, AI 영상 제작",
    roles: ["캐릭터 에셋 제작", "스타일링", "AI 영상 제작"],
    noResults: true,
    flow: { items: [
      ["기획 의도와 무드 파악"],
      ["에셋 제작"],
      ["사전 자료 제작", "인물 포지션 이미지, 스케치"],
      ["프롬프트 디자인"],
      ["프롬프트 테스트"],
      ["프롬프트 개선과 자료 보강", "Claude 모델링"],
      ["영상 생성"],
      ["프롬프트 수정과 생성 반복"]
    ] },
    steps: [
      { title: "캐릭터 에셋", img: "img/pre/rescene-asset.jpg", items: ["멤버별 얼굴을 유지한 캐릭터 에셋 생성", "광고 콘셉트에 맞춘 스타일링", "Photoshop으로 사전 작업"], tools: [["seedream", "이미지 생성"], ["photoshop", "사전 작업"]] },
      { title: "구도와 인물 배치", img: "img/pre/rescene-p1.jpg", items: ["텍스트 프롬프트만으로 전달되지 않는 장면은 구도 참조 스케치를 직접 그려서 해결", "Claude로 인물 배치도를 만들어 영상 생성에 활용"], tools: [["drawing", "구도 참조 스케치"], ["claude", "인물 배치도"]] },
      { title: "모델링과 애니메이션", img: "img/pre/rescene-p3.jpg", items: ["인물 5명이 한 화면에 등장하는 원테이크 구성", "Claude와 Higgsfield Blender로 모델링과 애니메이션을 제작하여, Seedance 2.5로 영상 작업 시 모션 및 카메라 무빙, 인물 배치 레퍼런스로 활용"], tools: [["claude", "Higgsfield Blender 모델링, 애니메이션"]] },
      { title: "원테이크 영상 생성", img: "img/pre/rescene-1.jpg", items: ["30초 원테이크 영상 시안 1편 제작", "편집 툴 없이 원테이크로 완성"], tools: [["seedance", "영상 생성"]] }
    ],
    process: { label: "영상 생성에 사용한 참조 자료", items: [
      ["img/pre/rescene-p1.jpg", "구도 참조 스케치"],
      ["img/pre/rescene-p3.jpg", "모델링과 애니메이션 키프레임"],
      ["img/pre/rescene-p2.jpg", "인물 배치도", "tall"]
    ] },
    /* 시안 두 편: A는 기존 작업 흐름, 작업 단계, 참조 자료를 묶고, B는 작업 방식, 피드백 반영 기록, 결과물을 둔다 */
    order: ["x:plans", "x:chA", "flow", "steps", "process", "x:chB", "x:loopB", "x:logB", "x:resB"],
    x: {
      plans: { type: "plans", label: "시안 구성", items: [
        { id: "A", name: "장면 모델링 원테이크", text: "인물 5명이 한 화면에 등장하는 30초 원테이크를 모델링과 애니메이션으로 설계하여 영상화하였습니다.",
          rows: [["날짜", "11.11 – 11.12"], ["방식", "장면 모델링과 애니메이션"], ["분량", "30초 원테이크"], ["제작 시간", "12시간"], ["중점", "복잡한 모션과 인물 5명 배치"]] },
        { id: "B", name: "피드백 즉시 반영", text: "장면을 모델링하지 않고, 감독과 조감독의 피드백과 요청을 받는 즉시 수정하며 마감에 맞춰 완성하였습니다.",
          rows: [["날짜", "11.13 – 11.14"], ["방식", "피드백을 받으며 바로 수정"], ["분량", "30초"], ["제작 시간", "약 20시간"], ["중점", "요청에 맞춘 빠른 수정"]] }
      ] },
      chA: { type: "chap", id: "A", name: "장면 모델링 원테이크",
        text: "텍스트 프롬프트만으로는 인물 5명의 동선과 복잡한 모션이 전달되지 않아, 장면을 모델링하고 애니메이션을 만든 뒤 영상 생성의 참조로 사용하였습니다.",
        tags: ["30초 원테이크", "인물 5명", "12시간"] },
      chB: { type: "chap", id: "B", name: "피드백 즉시 반영",
        text: "장면을 모델링하는 대신, 감독과 조감독의 피드백과 요청을 받는 즉시 수정하는 방식으로 진행하였습니다.",
        tags: ["30초", "약 20시간", "감독과 조감독 피드백"] },
      loopB: { type: "loop", label: "작업 방식", lead: "원하는 방향을 듣고 언제까지 전달할 수 있는지 먼저 확인한 뒤, 피드백과 확인을 받으며 빠르게 진행하였습니다.",
        items: ["요청 듣기", "일정 맞춰 제작", "피드백과 확인"], ret: "마감까지 반복" },
      logB: { type: "log", label: "피드백 반영 기록", heads: ["피드백 내용", "반영", "장면"],
        lead: "1차 피드백에서는 핵심 장면의 얼터안을 다른 방향으로 요청받아 제작하였고, 2차 피드백에서는 원하는 구도와 플로우를 받아 반영한 장면을 추가로 제작하였습니다.",
        rows: [
          ["첫 회의", "사람으로 이루어진 형상 요청", "사람들이 이어져 원을 이루는 장면 제작", "img/pre/rescene-b1.jpg"],
          ["제안", "사람이 더 많은 버전을 직접 제안", "재미있다는 피드백을 받아 ALT컷으로 제작", "img/pre/rescene-b2.jpg"],
          ["최종", "다른 방향의 영상으로 전환", "사람이 X자로 이어지는 장면으로 마무리", "img/pre/rescene-b3.jpg"]
        ] },
      resB: { type: "figs", label: "시안 B 결과물", items: [["img/pre/rescene-b-face.jpg", "멤버 클로즈업 장면"], ["img/pre/rescene-b3.jpg", "사람이 X자로 이어지는 장면"]] }
    },
    popCover: "img/pre/rescene-1.jpg",
    images: []
  },
  {
    lowTop: true,
    id: "lgrun", tone: "#29111d", no: "03",
    line: "img/line/lgrun.webp", thumb: "img/thumb/lgrun.jpg",
    homeTitle: "LG RUN", homeImg: "img/lgrun-cover.jpg", homePos: "50% 50%",
    title: "LG RUN 가전런",
    org: "LG전자 × 금성전파사 산학 프로젝트", kindLabel: "산학 프로젝트",
    period: "2026.09 –", year: "2026",
    cat: ["ip"], kind: "industry",
    tags: ["캐릭터 디자인", "아트 디렉팅"],
    status: "전시용 프로토타입 제작 중",
    cover: "img/lgrun-cover.jpg",
    summary: "LG AI 가전의 기능을 캐릭터의 스킬로 구현한 2D 횡스크롤 러닝 게임입니다. 로봇청소기는 탐험가, 공기청정기는 마법사, 에어컨은 기사로 설정하였습니다. LG 가전의 특징적인 형태를 모티프로 캐릭터를 제작하였고, 의상과 소품에 콘셉트를 부여하였습니다.",
    team: "팀 살리미 (3인)",
    roles: ["게임 콘텐츠 기획", "가전 캐릭터 3종 공동 디자인", "게임 그래픽 아트 디렉팅", "게임 화면 와이어프레임 설계"],
    tools: [["gptimage", "이미지 생성"], ["higgsfield", "이미지 생성"], ["midjourney", "이미지 생성"], ["cursor", "게임 구현"], ["claude", "게임 구현"]],
    toolsPlain: true, toolsNote: "초기 단계의 프로젝트로, 비주얼 작업을 진행하고 있습니다.",
    images: [], noResults: true,
    order: ["x:screens", "x:assets"],
    x: {
      screens: { type: "pairs", label: "게임 화면 개선", heads: ["초안 플레이 화면", "개선 와이어프레임"],
        lead: "초안 플레이 화면을 바탕으로 와이어프레임을 다시 설계하였습니다. 이 와이어프레임을 기준으로 화면을 개선하고 있습니다.",
        items: [
        ["가전 선택", "img/lgrun/sc-select.jpg", "img/lgrun/wf-select.jpg"],
        ["조작 안내", "img/lgrun/sc-guide.jpg", "img/lgrun/wf-guide.jpg"],
        ["플레이", "img/lgrun/sc-play.jpg", "img/lgrun/wf-play.jpg"],
        ["결과", "img/lgrun/sc-result.jpg", "img/lgrun/wf-result.jpg"]
      ] },
      assets: { type: "figs", label: "그래픽 에셋", lead: "파스텔 색감과 손그림 질감을 사용하고, 달리는 동안에도 화면이 잘 읽히도록 정리하는 과정 중에 있습니다.", items: [
        ["img/lgrun/stage.jpg", "스테이지 배경"],
        ["img/lgrun/objects.jpg", "장애물과 아이템"]
      ] }
    }
  },
  {
    id: "stitched", tone: "#291a11", no: "04",
    line: "img/line/stitched.webp", thumb: "img/thumb/stitched.jpg",
    homeTitle: "STITCHED ECHOES", homeImg: "img/stitched-key.jpg", homePos: "50% 45%",
    title: "Stitched Echoes",
    org: "인터랙티브 스토리 게임", orgLabel: "형식", kindLabel: "수업 과제",
    period: "2025", year: "2025",
    cat: ["ip", "video"], kind: "class",
    tags: ["게임 기획", "세계관", "AI 영상"],
    status: "프로토타입과 영상 완성",
    cover: "img/stitched-cover.jpg",
    popCover: "img/stitched-key.jpg",
    video: { label: "컷신 영상", items: [
      { src: "vid/stitched-intro.mp4", poster: "vid/stitched-intro.jpg", cap: "인트로 컷신" },
      { src: "vid/stitched-ending.mp4", poster: "vid/stitched-ending.jpg", cap: "엔딩 컷신, Threadbearer 엔딩" }
    ] },
    summary: "실로 꿰맨 도마뱀 인형이 잃어버린 기억의 단서를 모아 4개의 엔딩 중 하나에 도달하는 인터랙티브 스토리 게임입니다. 게임 규칙과 세계관을 기획하고 Figma로 프로토타입을 제작하였습니다. 인트로 컷신과 엔딩 영상도 제작하였습니다.",
    team: "수업 과제",
    roles: ["세계관 기획과 비주얼라이징", "인트로와 아웃트로 컷신 기획과 제작", "Figma 인터랙티브 게임 제작"],
    noteLabel: "스타일 스터디",
    note: "2025년 초중반, Midjourney에서 스타일과 캐릭터의 일관성이 유지되는 조건을 확인하려고 진행한 스터디입니다. 팀 버튼 감독의 스타일을 참고 기준으로 삼았고, 봉제 자국, 단추 눈, 낡은 천 질감을 모든 컷의 공통 기준으로 정하였습니다.",
    steps: [
      { title: "기획과 프로토타입", img: "img/steps/stitched-s1.jpg", items: ["게임 규칙과 엔딩 4종 기획", "세계관과 캐릭터 설정", "Figma 프로토타입 제작"], tools: [["figma", "게임 프로토타입"]] },
      { title: "장면 이미지 생성", img: "img/steps/stitched-s2.jpg", items: ["장면별 스타일 레퍼런스 정리", "레퍼런스를 바탕으로 장면 이미지 생성"], tools: [["chatgpt", "스타일 레퍼런스 생성"], ["midjourney", "장면 이미지 생성"]] },
      { title: "합성과 보정", img: "img/steps/stitched-p1.jpg", items: ["캐릭터와 배경 합성", "색 보정과 각도 수정"], tools: [["photoshop", "합성, 색 보정"]] },
      { title: "컷신 편집", img: "img/steps/stitched-s4.jpg", items: ["인트로 컷신과 엔딩 영상 편집", "배경 음악 생성"], tools: [["premiere", "컷신 편집"], ["suno", "배경 음악"]] }
    ],
    pipeline: [
      ["img/steps/stitched-p1.jpg", "캐릭터 이미지 생성 후 배경 제거"],
      ["img/steps/stitched-p2.jpg", "숲 배경 이미지 생성"],
      ["img/steps/stitched-p3.jpg", "캐릭터와 배경 합성"],
      ["img/steps/stitched-p4.jpg", "고개 각도와 실 묶음 수정, 색 보정"]
    ],
    images: [
      ["img/stitched-open.jpg", "오프닝 컷신 스틸컷"],
      ["img/stitched-title.jpg", "타이틀 화면"]
    ]
  },
  {
    lowTop: true,
    id: "salgu", tone: "#222911", no: "05",
    line: "img/line/salgu.webp", thumb: "img/thumb/salgu.jpg",
    homeTitle: "SALGU", homeImg: "img/salgu-cover.jpg", homePos: "50% 58%",
    title: "신입생 고양이 살구의 캠퍼스 브이로그",
    org: "국민대학교 홍보팀", kindLabel: "산학 프로젝트",
    period: "2025.05", year: "2025",
    cat: ["ip", "video"], kind: "industry",
    tags: ["캐릭터 디자인", "AI 영상", "편집"],
    status: "교내 스크린과 홈페이지 공개",
    cover: "img/salgu-cover.jpg",
    video: { src: "vid/salgu.mp4", poster: "vid/salgu.jpg", label: "본부관 스크린 송출" },
    summary: "전공자율선택제를 알리는 국민대학교 홍보 영상입니다. 교내 삼색고양이 살구를 목각인형 캐릭터로 제작하고, 실제 캠퍼스 촬영 컷에 캐릭터를 합성하여 브이로그 형식으로 구성하였습니다. 완성한 영상은 본부관 스크린과 학교 홈페이지에서 약 한 달 동안 공개되었습니다.",
    team: "3인 팀",
    roles: ["영상 기획", "캐릭터 디자인", "키아트 비주얼 제작", "영상화"],
    steps: [
      { title: "스토리보드", img: "img/steps/salgu-1.jpg", items: ["브이로그 형식의 장면 구성", "스토리보드 작성"], tools: [["chatgpt", "스토리보드 구상"], ["claude", "스토리보드 구상"]] },
      { title: "캐릭터와 장면 생성", img: "img/steps/salgu-2.jpg", items: ["목각인형 스타일의 캐릭터 설정", "장면 이미지 생성"], tools: [["midjourney", "캐릭터, 장면 이미지 생성"]] },
      { title: "실사 합성", img: "img/steps/salgu-3.jpg", items: ["촬영 컷에 캐릭터 합성", "표정과 조명이 맞지 않는 부분 수정"], tools: [["photoshop", "합성, 보정"]] },
      { title: "영상 변환과 편집", img: "img/steps/salgu-4.jpg", items: ["이미지를 영상으로 변환", "컷 편집, 자막, 배경 음악 작업"], tools: [["kling", "영상 변환"], ["premiere", "편집, 자막"], ["suno", "배경 음악"]] }
    ],
    images: [
      ["img/salgu-1.jpg", "캐릭터 설정 컷"],
      ["img/salgu-2.jpg", "실사 배경 합성 장면"],
      ["img/salgu-3.jpg", "본부관 스크린 송출"]
    ]
  },
  {
    lowTop: true,
    id: "farm", tone: "#111e28", no: "06",
    line: "img/line/farm.webp", thumb: "img/thumb/farm.jpg",
    title: "순환형 스마트 해양 양식장",
    org: "기획재정부 초혁신경제 실현 영상 공모전", orgLabel: "출품", kindLabel: "공모전",
    period: "2025.12", year: "2025",
    cat: ["video"], kind: "class",
    tags: ["기획", "AI 영상", "합성"],
    status: "부총리 겸 기획재정부 장관상", statusType: "award",
    cover: "img/farm-cover.jpg",
    video: { src: "vid/farm.mp4", poster: "vid/farm.jpg", label: "공모전 출품 영상" },
    summary: "고수온으로 인한 양식 어류 폐사 문제에 대응하는 해상 양식장을 구상하고, 생성형 AI로 홍보 영상을 제작하였습니다. 심해의 저온수를 끌어올려 순환시키는 구조와 AI 수중 모니터링 방식을 장면으로 구성하였습니다. 대학부 최종 선정작으로 부총리 겸 기획재정부 장관상을 수상하였습니다.",
    team: "3인 팀",
    roles: ["기획과 리서치", "아이디어 디자인", "비주얼 디렉팅", "영상화", "자막 제작"],
    steps: [
      { title: "기획안과 스토리보드", img: "img/steps/farm-1.jpg", items: ["전체 콘셉트 방향 기획", "방향에 맞춰 스토리보드 수정과 구조 보완", "나레이션 문구와 메시지 톤 정리", "영상 구성에 맞춘 UX 라이팅"], tools: [["chatgpt", "기획안, 나레이션 문구"], ["figma", "스토리보드 정리"]] },
      { title: "프리비즈 이미지 생성", img: "img/steps/farm-2.jpg", items: ["스토리보드에 맞춘 장면 구도 기획", "씬 구성과 비주얼 방향 설정", "무드보드 구성과 이미지 제작", "스타일과 색감 디렉션"], tools: [["midjourney", "장면 이미지 생성"], ["aistudio", "장면 이미지 생성"]] },
      { title: "이미지 편집과 보정", img: "img/steps/farm-3.jpg", items: ["Photoshop으로 이미지 합성과 수정", "세부 디테일 보완", "AI 생성 이미지를 반복 재생성해 품질 개선"], tools: [["photoshop", "합성, 보정"], ["kling", "영상 변환"]] },
      { title: "영상 편집", img: "img/steps/farm-4.jpg", items: ["나레이션과 자막 제작", "컷 편집, 사운드와 그래픽 효과 편집", "최종 품질 검수와 출력"], tools: [["premiere", "편집, 자막"], ["suno", "배경 음악"]] }
    ],
    images: [
      ["img/farm-1.jpg", "양식장 운영 장면"],
      ["img/farm-2.jpg", "AI 수중 모니터링 장면"]
    ]
  },
  {
    id: "gecko", tone: "#442b45", no: "07", bg: "img/gecko/bg.jpg",
    line: "img/line/gecko.webp", thumb: "img/thumb/gecko.jpg",
    homeTitle: "gecko? gecko!", homeImg: "img/gecko-cover.jpg", homePos: "50% 42%",
    title: "gecko? gecko!",
    org: "게코 추천 타로 카드", orgLabel: "형식", kindLabel: "수업 과제",
    period: "2025", year: "2025",
    cat: ["ip", "graphic"], kind: "class",
    tags: ["캐릭터 디자인", "카드 그래픽", "실물 제작"],
    status: "카드와 보드 실물 제작",
    cover: "img/gecko-cover.jpg",
    summary: "의자, 조명, 오브제 카드를 한 장씩 고르면 그날 함께할 게코도마뱀을 타로 카드 형식으로 추천하는 카드 게임입니다. 선택 카드와 게코 카드, 플레이 보드를 디자인하고 실물로 제작하였습니다.",
    team: "수업 과제",
    roles: ["카드 선택 규칙 설계", "게코 캐릭터 카드 디자인", "보드와 카드 뒷면 그래픽", "실물 제작"],
    tools: [["chatgpt", "기획, 이미지 생성"], ["midjourney", "이미지 생성"], ["photoshop", "편집"], ["illustrator", "편집"], ["figma", "편집"]],
    /* 카드 그래픽 구성. 이미지는 img/gecko/ (s01~s15 선택 카드, g0~g5 게코 카드, back, board, logo) */
    deck: {
      counts: [["총 카드 수", "72장"], ["라벨별 선택 카드", "15종"], ["게코 카드", "55종"], ["스페셜 카드", "2종"], ["플레이 보드", "1장"]],
      moods: [["장난꾸러기", "지루할 틈 없는 사고뭉치"], ["조용한 숨결", "함께하는 게 편안한 게코"], ["손위의 온기", "지금 당장 교감이 필요해!"], ["재잘재잘", "도마뱀도 말이 많을 수 있어"], ["작은 돌봄", "관심도 사랑도 많이 주고 싶어"]],
      rows: [
        ["의자", "오늘은 여기에 앉아서 쉬고 싶어", ["01", "05", "04", "02", "03"]],
        ["조명", "이런 빛깔 아래서 힐링 될 것 같아", ["06", "10", "09", "07", "08"]],
        ["오브제", "방에 두면 딱이겠는데?", ["11", "15", "14", "12", "13"]]
      ],
      geckos: [["0", "크레스티드 게코"], ["1", "유카탄줄무늬 게코"], ["4", "토케이 게코"], ["3", "게코-게코"], ["2", "노브테일 게코"], ["5", "레오파드 게코"]],
      guide: ["세 가지 선택 영역에 의자, 조명, 오브제 카드를 한 장씩 골라 배치하세요.", "세 카드를 모두 선택 후, 부록 책자에서 카드 조합을 확인하세요.", "덱 하단 게코 영역에 오늘 당신과 함께할 운명의 게코를 배치해주세요."],
      ask: "지금, 당신과 함께하기 가장 좋은 게코는 누구일까요?"
    },
    images: []
  },
  {
    id: "unfolds", tone: "#112229", no: "08",
    line: "img/line/unfolds.webp", thumb: "img/thumb/unfolds.jpg",
    title: "THE TIME UNFOLDS",
    org: "LG전자 × 금성전파사 LED 갤러리", kindLabel: "산학 프로젝트",
    period: "2026.11 –", year: "2026",
    cat: ["video"], kind: "industry",
    tags: ["영상 기획", "키아트"],
    status: "제작 진행 중",
    cover: "img/unfolds-cover.jpg",
    video: { src: "vid/unfolds.mp4", poster: "vid/unfolds.jpg", label: "샘플 영상", cap: "발표에 사용한 30초 시안, Kling으로 제작" },
    summary: "LG AI 가전이 줄여 준 집안일 시간을 자연 속 여가 장면으로 표현한 75초 반복 영상 기획입니다. 에어로타워, 워시타워, 로봇청소기의 형태가 하늘, 호수, 산 풍경으로 바뀌는 장면 전환을 설계하였습니다.",
    team: "팀 살리미 (3인) 중 단독 담당",
    roles: ["영상 구성과 장면 전환 기획", "키아트 제작", "샘플 영상 제작", "ㄱ자형 LED 화면(3840×596px)에 맞춘 배치 설계"],
    tools: [["midjourney", "키아트"], ["kling", "샘플 영상"]],
    resultsLabel: "키아트 시안",
    order: ["video", "x:idea", "x:scenes", "x:trans", "x:make", "res"],
    x: {
      idea: { type: "list", label: "기획 의도", cols: 3, desc: true,
        q: "가전이 줄여 준 집안일로 내가 쓸 수 있는 시간이 늘어난다면?",
        lead: "LG AI 가전이 맡아 주는 일과 그 시간에 할 수 있는 여가를 연결하여 영상으로 전달합니다.",
        items: [
          ["LG AI 가전", "세탁과 건조, 청소, 공기 관리처럼 반복되는 집안일의 수고를 덜어 줍니다."],
          ["사용자의 시간", "집안일에 쓰던 시간과 관심을 원하는 활동에 쓸 수 있습니다."],
          ["영상으로 전달하는 메시지", "거대한 자연 속에서 각자 원하는 방식으로 시간을 보내는 사람들의 모습으로 가전이 주는 여유를 전달합니다."]
        ] },
      scenes: { type: "scenes", label: "세 가지 장면",
        lead: "LG 가전은 오브제의 성격을 살려 구조물로 사용하고, 주변 배경은 실사에 가까운 질감으로 표현하였습니다.",
        items: [
          { img: "img/unfolds/air.jpg", tag: "AIR", title: "패러글라이딩", sub: "퓨리케어 에어로타워, 공기 관리", text: "U자형 구조에서 만들어진 바람이 하늘로 뻗어 나가는 모습으로 공기를 표현하였습니다." },
          { img: "img/unfolds/water.jpg", tag: "WATER", title: "카약", sub: "트롬 AI 워시타워, 세탁과 건조", text: "원형 도어에서 퍼지는 동심원 물살 위에서 카약을 타는 장면으로 여가를 표현하였습니다." },
          { img: "img/unfolds/ground.jpg", tag: "GROUND", title: "트레킹", sub: "로보킹 AI 올인원, 공간 청소", text: "로봇청소기의 주행 경로가 등산길로 바뀌는 장면 전환을 넣었습니다." }
        ] },
      trans: { type: "pipe", label: "장면 전환 예시", small: "AIR", ar: 1.5, stack: true, items: [
        ["img/unfolds/air.jpg", "에어로타워의 U자형 구조를 보여 줍니다.", "PRODUCT"],
        ["img/unfolds/t2.jpg", "제품 사이의 빈 공간을 확대합니다.", "CLOSE-UP"],
        ["img/unfolds/t3.jpg", "하늘이 넓어지며 패러글라이더가 등장합니다.", "LANDSCAPE"]
      ] },
      make: { type: "list", label: "제작 순서", cols: 3, desc: true, items: [
        ["키아트 제작", "가전 조형 시안과 자연 풍경의 구도 확정"],
        ["AI 영상 제작", "장면별 짧은 영상 생성과 선별"],
        ["후반 합성", "매치 컷, 물성 변화, 장면 이음부 보완"]
      ] }
    },
    images: [
      ["img/unfolds/pano3.jpg", "LED 화면 비율(32:5)에 맞춘 파노라마 시안", "full"],
      ["img/unfolds/wide1.jpg", "가전 조형 배치 시안"],
      ["img/unfolds/wide2.jpg", "가전 조형 배치 시안"]
    ]
  },
  {
    id: "osulloc", tone: "#18211c", no: "09",
    line: "img/line/osulloc.webp", thumb: "img/thumb/osulloc.jpg", thumbPos: "88% 50%",
    title: "茶茶日常 : 오늘의탕",
    org: "제18회 국민대학교 조형전", orgLabel: "전시", kindLabel: "수업 과제",
    period: "2025.11", year: "2025",
    cat: ["graphic"], kind: "class",
    tags: ["공간 브랜딩", "전시 기획", "인쇄물"],
    status: "조형전 전시",
    cover: "img/osulloc-cover.jpg",
    summary: "오설록의 '다다일상'을 차와 목욕탕을 엮은 공간 브랜딩으로 해석한 전시 프로젝트입니다. 리플렛, 패키지, 포스터를 제작하여 약 3주 만에 전시하였습니다. 상업적 목적이 없는 학술 프로젝트입니다.",
    team: "4인 팀", stepsFill: true,
    roles: ["서비스와 전시 콘텐츠 기획", "비주얼 디렉팅", "포스터, 스티커, 팸플릿 등 인쇄물 전체 제작"],
    steps: [
      { title: "인쇄물과 패키지", img: "img/osulloc-3.jpg", items: ["리플렛, 스티커, 포스터 디자인", "어매니티 패키지 디자인"], tools: [["illustrator", "인쇄물, 패키지"], ["indesign", "리플렛 편집"], ["photoshop", "이미지 보정"]] },
      { title: "조형전 출품", img: "img/osulloc-5.jpg", items: ["제18회 국민대학교 조형전에 출품", "전시 디스플레이 구성과 설치"], tools: [] }
    ],
    order: ["x:aimap", "steps", "res"],
    x: {
      /* 기존 포트폴리오 16쪽 AI Design Process 지도: 발산 → 사용자 조사와 오설록 → 오늘의탕 ← 실물 목업, 영상 */
      aimap: { type: "aimap", label: "AI 활용 흐름",
        lead: "사용자 조사부터 프로토타입 제작까지 전 과정에 AI를 활용하여 리서치 정확도와 작업 효율을 높였습니다.",
        from: ["발산", ["ChatGPT", "Gemini"]],
        research: ["사용자 조사", "오설록"],
        core: "오늘의탕",
        make: [["실물 목업", ["Midjourney", "Google Nano Banana", "Photoshop Generative"]], ["영상", ["Suno", "Kling", "Sora", "Veo 3"]]] }
    },
    images: [
      ["img/osulloc-3.jpg", "어매니티 패키지"],
      ["img/osulloc-4.jpg", "전시 설치"]
    ]
  },
  {
    lowTop: true,
    id: "mentoring", tone: "#1f1c21", no: "10",
    line: "img/line/mentoring.webp", thumb: "img/thumb/mentoring.jpg", popCover: "img/mentoring-cover.jpg",
    title: "청소년 AI 뮤직비디오 멘토링",
    org: "성북구청 × 국민대학교", kindLabel: "산학 프로젝트",
    period: "2026.07 – 2026.08", year: "2026",
    cat: ["video"], kind: "industry",
    tags: ["수업 기획", "AI 뮤직비디오"],
    status: "상영회 완료",
    summary: "청소년이 직접 AI 뮤직비디오를 만드는 수업을 영화 전공 멘토들과 함께 기획하였습니다. 수업에 앞서 학생이 만들고 싶은 영상의 방향을 스스로 고를 수 있도록 스타일 월드컵 사이트를 제작하였습니다. 음악 생성, 콘티, 이미지 생성, 영상 변환, 편집, 포스터 제작 과정을 진행하고 상영회를 운영하였습니다.",
    team: "멘토 공동 운영",
    roles: ["수업 기획", "뮤직비디오 스타일 분석과 스타일 월드컵 제작", "AI 영상 프롬프트 프리셋과 교안 제작", "상영회 운영"],
    tools: [["midjourney", "이미지 생성"], ["suno", "음악 생성"], ["kling", "영상 변환"]],
    images: [], noResults: true,
    order: ["x:cup", "x:pick", "x:styles", "x:guide"],
    x: {
      cup: { type: "phones", label: "스타일 월드컵", narrow: true,
        lead: "만들고 싶은 영상의 방향을 정하기 어려워하는 중고등학생이 수업 전에 자신의 취향을 살펴볼 수 있도록 제작한 사이트입니다. 설문 대신 학생들에게 익숙한 월드컵 형식을 사용하였습니다.",
        items: [
          ["img/mentoring/p1.jpg", "시작 화면"],
          ["img/mentoring/p2.jpg", "큰 분위기 고르기"],
          ["img/mentoring/p3.jpg", "세부 스타일 고르기"],
          ["img/mentoring/p4.jpg", "영상 형식 고르기"],
          ["img/mentoring/p5.jpg", "결과와 스타일 설명", "cut"]
        ] },
      pick: { type: "list", label: "스타일 선정 과정", cols: 5, narrow: true, items: [
        ["아이돌 뮤직비디오 분석"],
        ["AI로 구현하기 쉬운 스타일 선별"],
        ["이미지와 영상 테스트"],
        ["패션 필름과 아트 필름 분석", "스타일 추가 선정"],
        ["스타일 이름 짓기"]
      ], row: [
        ["img/mentoring/board1.jpg", "뮤직비디오, 패션 필름, 아트 필름 분석 보드", 1196, 675],
        ["img/mentoring/board2.jpg", "스타일별 이미지 테스트", 592, 850]
      ] },
      styles: { type: "list", label: "스타일 분류", plain: true, cols: 4,
        lead: "수업에서는 Kling 2.0만 사용할 수 있었습니다. 이 조건에 맞춰 Midjourney와 Kling으로 테스트한 뒤 높은 완성도로 구현되는 스타일만 남겼고, 전문 지식이 없는 학생도 바로 이해할 수 있는 이름을 붙였습니다.",
        items: [
        ["빈티지", ["청량 빈티지", "디카 빈티지", "홍콩 빈티지", "캠코더 빈티지"]],
        ["몽환", ["자연친화 몽환", "드림코어 몽환", "빛번짐 몽환"]],
        ["미니멀", ["전통 미니멀", "무채색 미니멀", "컬러 미니멀"]],
        ["맥시멀", ["다크 맥시멀", "키치 맥시멀", "전통 맥시멀"]]
      ] },
      guide: { type: "figs", label: "교안", small: "Midjourney", narrow: true, items: [
        ["img/mentoring/mj.jpg", "Midjourney 화면 구성과 기능을 설명한 교안", "full"]
      ] }
    }
  },
  {
    lowTop: true,
    id: "sakamoto", tone: "#232426", no: "11",
    line: "img/line/sakamoto.webp", thumb: "img/thumb/sakamoto.jpg",
    title: "류이치 사카모토 인터뷰 북과 CD 커버",
    org: "책과 CD 커버 세트", orgLabel: "형식", kindLabel: "편집 디자인",
    period: "2024.11", year: "2024",
    cat: ["graphic"], kind: "class",
    tags: ["편집 디자인", "인쇄물"],
    status: "실물 제작",
    cover: "img/thumb/sakamoto.jpg",
    summary: "류이치 사카모토의 작업 세계와 철학을 다룬 인터뷰를 편집하여 책으로 제작하였습니다. 인터뷰 내용과 거장의 면모가 잘 드러나도록 책의 방향을 기획하고 레이아웃과 내지를 디자인하였습니다. 책을 완성한 뒤 CD 커버 디자인을 더하여 세트로 제작하였습니다.",
    team: "개인 작업",
    roles: ["책 기획과 인터뷰 편집", "레이아웃과 내지 디자인", "CD 커버 디자인"],
    tools: [["indesign", "책 편집"], ["illustrator", "CD 커버"]],
    /* 화질이 높지 않아 세 장을 같은 높이로 한 줄에 작게 둔다(세 번째 값은 가로 대 세로 비율) */
    strip: true,
    images: [
      ["img/sakamoto-package.jpg", "BOOK & CD PACKAGE", 0.75],
      ["img/sakamoto-cd.jpg", "CD OBJECT & DETAILS", 0.75],
      ["img/sakamoto-spread.jpg", "EDITORIAL SPREAD", 1.125]
    ]
  },
  {
    id: "kkal", tone: "#14211f", no: "12",
    line: "img/line/kkal.webp", thumb: "img/thumb/kkal.jpg",
    title: "KKAL",
    org: "스태킹 모듈형 스피커", orgLabel: "형식", kindLabel: "개인 작업",
    period: "2026.04 –", year: "2026",
    cat: ["video"], kind: "personal",
    tags: ["비주얼 디렉팅", "컬러 시스템", "제품 영상"],
    status: "진행 중",
    cover: "img/kkal-cover.jpg",
    video: { src: "vid/kkal.mp4", poster: "vid/kkal.jpg", label: "제품 설명 영상" },
    summary: "여러 사람이 모듈을 쌓아 사운드 튜닝 값을 바꾸는 스태킹 모듈형 스피커입니다. 한국 전통 색 개념인 간색에서 출발하여 숲, 노을, 여울, 밤, 들 다섯 가지 컬러 모듈에 각각 다른 음색을 정하고, 쌓는 조합에 따라 튜닝 값이 달라지도록 구성하였습니다. 공모전 출품을 위한 제품 설명 영상도 제작하였습니다.",
    team: "4인 팀 (김효림, 지성민, 한서영, 허준서)",
    roles: ["전반적인 비주얼 디렉팅", "제품 콘셉트 기획", "형태 디자인", "컬러 시스템 설계", "사용자 인터랙션 설계", "제품 설명 영상 제작"],
    tools: [["higgsfield", "영상 제작", 5], ["photoshop", "이미지 합성, 보정", 5], ["illustrator", "컬러 시스템, 그래픽", 4], ["midjourney", "제품 이미지", 4]],
    images: [
      ["img/kkal-1.jpg", "다섯 가지 컬러 모듈"],
      ["img/kkal-2.jpg", "모듈을 쌓는 장면"]
    ]
  },
  {
    lowTop: true,
    id: "folio", tone: "#2a1b21", no: "13",
    line: "img/line/folio.webp", thumb: "img/thumb/folio.jpg", popCover: "img/folio-cover.jpg",
    title: "포트폴리오 웹사이트",
    org: "인턴십 지원용 포트폴리오", orgLabel: "용도", kindLabel: "개인 작업",
    period: "2026.11", year: "2026",
    cat: ["graphic"], kind: "personal",
    tags: ["웹 디자인", "정보 디자인"],
    status: "제작 진행 중",
    summary: "인턴십 지원을 위해 이틀 동안 제작한 포트폴리오 웹사이트입니다. 레퍼런스를 분석하여 스타일가이드를 정하고, Figma로 화면 와이어프레임을 설계한 뒤 Claude와 함께 구현하였습니다.",
    team: "개인 작업",
    roles: ["사이트 기획과 정보 구조 설계", "스타일가이드와 UI 와이어프레임 설계", "썸네일 선 그림과 그래픽 요소 제작", "Claude를 활용한 구현과 화면 점검"],
    tools: [["claude", "구현"], ["figma", "UI 와이어프레임"]],
    images: [], noResults: true,
    order: ["x:flow", "x:rules"],
    x: {
      flow: { type: "list", label: "제작 과정", cols: 4, items: [
        ["레퍼런스 분석"],
        ["스타일가이드 확정", "색, 타이포그래피, 레이아웃"],
        ["정보 구조와 와이어프레임", "Figma"],
        ["구현", "Claude"],
        ["작업별 팝업 구성"],
        ["화면 폭별 점검", "데스크톱, 모바일"]
      ] },
      /* vis: 항목마다 아래에 붙는 그림. "card:작업id"는 그 작업 카드가 선 그림에서 실제 이미지로 바뀌는 장면을 반복한다 */
      rules: { type: "list", label: "디자인 기준", cols: 3, desc: true, vis: ["img/folio-elements.jpg", "card:gecko", "img/folio-popups.jpg"], items: [
        ["재단선", "인쇄물의 재단선을 카드와 메모, 커서에 반복하여 사이트 전체의 인상을 통일하였습니다."],
        ["선 그림 썸네일", "작업 목록은 선 그림으로 통일하고, 마우스를 올리면 실제 이미지가 나타나도록 하였습니다."],
        ["같은 형식의 작업 팝업", "모든 작업을 요약, 맡은 일, 사용 툴 순서로 정리하고 작업마다 대표 색을 배경으로 사용하였습니다."]
      ] }
    }
  }
];

window.SKILLS = {
  tools: [
    ["AI 이미지와 영상", ["higgsfield", "midjourney", "kling", "aistudio"]],
    ["편집과 음악", ["premiere", "suno"]],
    ["그래픽과 UI", ["photoshop", "illustrator", "indesign", "figma"]],
    ["3D", ["blender"]],
    ["기획 보조", ["chatgpt", "claude"]]
  ],
  /* [짧은 이름, 세부 내용, 상/중/하, 관련 작업] */
  jobs: [
    ["캐릭터 디자인", [
      ["외형 디자인", "아티스트 외형, 헤어, 스타일링", "상", ["imaginus", "rescene"]],
      ["착장 디자인", "의상과 소품", "중", ["imaginus", "lgrun"]],
      ["세계관 비주얼", "세계관에 맞춘 비주얼 정리", "중", ["stitched", "unfolds"]],
      ["그래픽 디자인", "앨범 아트, 포스터, 굿즈", "중", ["gecko", "osulloc"]],
      ["디자인 가이드", "다른 팀에 전달하는 가이드 제작", "중", ["lgrun"]]
    ]],
    ["AI 영상 제작", [
      ["이미지 생성", "캐릭터 이미지와 비주얼 콘셉트", "상", ["imaginus", "rescene", "salgu"]],
      ["캐릭터 일관성", "컷이 바뀌어도 얼굴과 스타일 유지", "상", ["rescene", "stitched"]],
      ["장면 제작", "장면 생성, 합성, 후반 편집", "상", ["imaginus", "farm", "salgu"]],
      ["컷 구성", "스토리보드에 맞춘 컷 구성", "상", ["farm", "salgu", "unfolds"]],
      ["뮤직비디오", "음악에 맞춘 편집", "중", ["mentoring"]],
      ["제작 워크플로우", "생성형 AI 제작 과정 정리", "중", ["imaginus"]]
    ]]
  ]
};

window.ARCHIVE = [
  { img: "img/ar-calendar.jpg", imgs: ["img/cal-1.jpg", "img/cal-2.jpg", "img/cal-3.jpg", "img/cal-4.jpg"], line: "img/line/ar-calendar.webp", title: "2026 말 달력", note: "캐릭터 스타일링과 달력 디자인" },
  { img: "img/ar-exhibit-a.jpg", line: "img/line/ar-organism.webp", title: "유기체 인식 보고서", note: "전시 기획과 작품 제작, 2025" },
  { img: "img/ar-exhibit-b.jpg", line: "img/line/ar-lost.webp", pos: "30% 50%", title: "분실물 보관함", note: "아이디어회관 전시 기획과 제작, 2025" },
  { img: "img/ar-interstellar.jpg", line: "img/line/ar-interstellar.webp", pos: "50% 22%", title: "Time Bends, Gravity Rules", note: "영화 인터스텔라 정보디자인 포스터, 학과 전시" }
];

/* Home 화면. feature: 대표 작업 무대 순서. figure: 캐릭터 피규어 모듈(null이면 fig.js를 불러오지 않는다)
   작업 객체의 homeTitle(무대 영문 작업명), homeImg(무대 이미지, 없으면 popCover → cover → thumb), homePos(object-position) */
window.HOME = {
  feature: ["imaginus", "rescene", "stitched", "salgu", "lgrun", "gecko"],
  figure: null
};
