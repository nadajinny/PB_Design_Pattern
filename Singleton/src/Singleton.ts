// src/services/Singleton.ts

export default class Singleton {
  private static instance: Singleton | null = null;

  // 외부에서 new Singleton() 금지
  private constructor() {}

  // 인스턴스 반환 메서드 (Lazy Initialization)
  public static getInstance(): Singleton {
    if (Singleton.instance === null) {
      Singleton.instance = new Singleton();
      console.log("✅ Singleton 인스턴스가 생성되었습니다.");
    }
    return Singleton.instance;
  }

  // 테스트용 메서드
  public sayHello(): void {
    console.log("안녕하세요! 저는 Singleton 인스턴스입니다 👋");
  }

  // 예시용 메서드 (로깅 기능)
  public log(message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }
}
