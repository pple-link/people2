export enum IsAdmin {
  ADMIN = "admin",
  NORMAL = "normal"
}

export enum Blood {
  RHPO = "o+",
  RHPB = "b+",
  RHPA = "a+",
  RHPAB = "ab+",
  RHMO = "o-",
  RHMB = "b-",
  RHMA = "a-",
  RHMAB = "ab-"
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
