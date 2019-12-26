export enum IsAdmin {
  ADMIN = "admin",
  NORMAL = "normal"
}

export enum Blood {
  RHPO = "RH+O",
  RHPB = "RH+B",
  RHPA = "RH+A",
  RHPAB = "RH+AB",
  RHMO = "RH-O",
  RHMB = "RH-B",
  RHMA = "RH-A",
  RHMAB = "RH-AB"
}

export enum Location {
  SEOUL = "서울",
  KANGWONDO = "강원도",
  KYEONGIDO = "경기도",
  CHUNGCHEONGDO = "충청도",
  JEONLADO = "전라도",
  KYEONGSANGDO = "경상도",
  JEJUDO = "제주도"
}

export enum DonationKind {
  ALL = "전혈",
  BACKHYEOLGU = "백혈구",
  HYEOLSOPAN = "혈소판",
  JEOCKHYEOLGU = "적혈구",
  HYEOLJANG = "혈장"
}

export enum ShowFlag {
  SHOW = "노출",
  NOSHOW = "비노출",
  PENDING = "대기",
  COMPLETE = "모집완료"
}

export enum Sex {
  MALE = "male",
  FEMALE = "female"
}

export enum Job {
  STUDENT = "학생",
  JOBLESS = "무직",
  WHITE = "직장인",
  RESEARCH = "연구직",
  FREELANCER = "프리랜서",
  MEDICAL = "보건의료종사자",
  MEDIA = "예체능",
  GIG = "일용직",
  BLUE = "생산직",
  HOUSE = "주부"
}

export enum Provider {
  GOOGLE = "google",
  KAKAO = "kakao",
  NAVER = "naver"
}
