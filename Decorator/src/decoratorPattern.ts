// ===========================================================
// 07-09. Decorator Pattern
// ===========================================================

console.group("====== [Decorator Design Pattern] ======");

// 1️⃣ Component 인터페이스
interface Notifier {
  send(message: string): void;
}

// 2️⃣ Concrete Component (기본 기능)
class BaseNotifier implements Notifier {
  send(message: string): void {
    console.log(`📢 기본 알림: ${message}`);
  }
}

// 3️⃣ Decorator 추상 클래스
abstract class NotifierDecorator implements Notifier {
  protected wrappee: Notifier;

  constructor(notifier: Notifier) {
    this.wrappee = notifier;
  }

  send(message: string): void {
    // 기존 기능을 그대로 유지한 채 확장
    this.wrappee.send(message);
  }
}

// 4️⃣ 구체적인 데코레이터 클래스들
class EmailNotifier extends NotifierDecorator {
  send(message: string): void {
    super.send(message);
    console.log(`📧 이메일 발송: ${message}`);
  }
}

class SMSNotifier extends NotifierDecorator {
  send(message: string): void {
    super.send(message);
    console.log(`📱 SMS 발송: ${message}`);
  }
}

class SlackNotifier extends NotifierDecorator {
  send(message: string): void {
    super.send(message);
    console.log(`💬 Slack 발송: ${message}`);
  }
}

class PushNotifier extends NotifierDecorator {
  send(message: string): void {
    super.send(message);
    console.log(`📲 푸시 발송: ${message}`);
  }
}

// 5️⃣ 실행 함수 (Vue에서 import하여 호출 가능)
export default function runDecoratorPattern() {
  console.log("✅ Decorator 패턴 시뮬레이션 시작");

  // 기본 알림 객체
  let notifier: Notifier = new BaseNotifier();

  // 필요한 기능을 런타임에서 동적으로 조합
  notifier = new EmailNotifier(notifier);
  notifier = new SMSNotifier(notifier);
  notifier = new SlackNotifier(notifier);
  notifier = new PushNotifier(notifier);

  notifier.send("🚨 긴급 서버 장애 발생!");

  console.log("✅ Decorator 패턴 시뮬레이션 종료");
  console.groupEnd();
}
