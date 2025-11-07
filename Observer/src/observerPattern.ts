// ===========================================================
// 07-12. Observer Pattern
// ===========================================================

console.group("====== [Observer Design Pattern] ======");

// 1️⃣ Observer 인터페이스
interface Observer {
  update(price: number): void;
}

// 2️⃣ Subject 인터페이스
interface Subject {
  register(observer: Observer): void;
  unregister(observer: Observer): void;
  notify(): void;
}

// 3️⃣ Concrete Subject (주체)
class Stock implements Subject {
  private observers: Observer[] = [];
  private price: number = 0;

  register(observer: Observer): void {
    this.observers.push(observer);
    console.log("👀 옵저버 등록 완료:", observer.constructor.name);
  }

  unregister(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer);
    console.log("👋 옵저버 해제 완료:", observer.constructor.name);
  }

  setPrice(newPrice: number): void {
    console.log(`📈 주가 업데이트: ${this.price} → ${newPrice}`);
    this.price = newPrice;
    this.notify(); // 상태 변화 시 모든 옵저버에 알림
  }

  notify(): void {
    console.log("🔔 모든 옵저버에 알림 전송...");
    for (const observer of this.observers) {
      observer.update(this.price);
    }
    console.log("--------------------------------");
  }
}

// 4️⃣ Concrete Observers (관찰자들)
class PriceDisplay implements Observer {
  update(price: number): void {
    console.log(`📺 [PriceDisplay] 현재 주가 = ${price}`);
  }
}

class PriceAlert implements Observer {
  update(price: number): void {
    if (price > 100) {
      console.log(`🚨 [PriceAlert] 주가 ${price} 초과! 매도 신호 발생!`);
    } else {
      console.log(`✅ [PriceAlert] 안정 구간 유지 (${price})`);
    }
  }
}

class GraphUpdater implements Observer {
  update(price: number): void {
    console.log(`📊 [GraphUpdater] 그래프 갱신 → 새 데이터 포인트 추가: ${price}`);
  }
}

// 5️⃣ 실행 함수 (Vue에서 import해서 버튼으로 실행)
export default function runObserverPattern() {
  console.log("✅ Observer 패턴 시뮬레이션 시작");

  // 주체(Subject)
  const stock = new Stock();

  // 옵저버들 등록
  const display = new PriceDisplay();
  const alert = new PriceAlert();
  const graph = new GraphUpdater();

  stock.register(display);
  stock.register(alert);
  stock.register(graph);

  // 주가 변경 → 자동으로 옵저버들에게 알림
  stock.setPrice(80);
  stock.setPrice(120);

  // 옵저버 해제 후 재갱신
  stock.unregister(graph);
  stock.setPrice(95);

  console.log("✅ Observer 패턴 시뮬레이션 종료");
  console.groupEnd();
}
