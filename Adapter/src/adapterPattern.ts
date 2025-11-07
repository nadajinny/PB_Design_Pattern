// ===========================================================
// 07-06. Adapter Pattern
// ===========================================================

console.group("====== [Adapter Design Pattern] ======");

// 1️⃣ Target 인터페이스 (클라이언트가 기대하는 인터페이스)
interface OldPaymentProcessor {
  pay(amount: number): void;
}

// 2️⃣ Adaptee (새로운 결제 시스템, 기존과 호환 불가)
class NewPaymentGateway {
  makePayment(value: number): void {
    console.log(`💳 ${value}원을 새 결제 게이트웨이로 처리함`);
  }
}

// 3️⃣ Adapter (Target 인터페이스 구현 + Adaptee 내부 호출)
class PaymentAdapter implements OldPaymentProcessor {
  private gateway: NewPaymentGateway;

  constructor(gateway: NewPaymentGateway) {
    this.gateway = gateway;
  }

  pay(amount: number): void {
    console.log("🔁 어댑터를 통해 결제 요청을 변환 중...");
    this.gateway.makePayment(amount);
  }
}

// 4️⃣ 클라이언트 코드 (OldPaymentProcessor 인터페이스만 인식)
function processPayment(processor: OldPaymentProcessor, amount: number) {
  console.log("💰 결제 요청 중...");
  processor.pay(amount);
  console.log("--------------------------------");
}

// 5️⃣ 실행 함수 (Vue에서 import 가능)
export default function runAdapterPattern(amount: number = 1000) {
  console.log("✅ Adapter 패턴 시뮬레이션 시작");

  // 기존 코드에서는 OldPaymentProcessor만 사용 가능
  const newGateway = new NewPaymentGateway();

  // 새로운 결제 시스템을 어댑터로 감싸서 기존 인터페이스에 맞춤
  const adapter = new PaymentAdapter(newGateway);

  // 클라이언트는 여전히 OldPaymentProcessor 인터페이스를 사용
  processPayment(adapter, amount);

  console.log("✅ Adapter 패턴 시뮬레이션 종료");
  console.groupEnd();
}
