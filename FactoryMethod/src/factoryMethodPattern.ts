// ===========================================================
// 07-02. Factory Method Pattern
// ===========================================================

console.group('====== [Factory Method Pattern] ======')

// 1️⃣ Product 인터페이스
interface Button {
  render(): void
  onClick(): void
}

// 2️⃣ ConcreteProduct: 구체 제품 클래스들
class WindowsButton implements Button {
  render(): void {
    console.log('🪟 윈도우 스타일 버튼 렌더링')
  }
  onClick(): void {
    console.log('🪟 윈도우 버튼 클릭 이벤트 처리')
  }
}

class MacButton implements Button {
  render(): void {
    console.log('🍎 맥 스타일 버튼 렌더링')
  }
  onClick(): void {
    console.log('🍎 맥 버튼 클릭 이벤트 처리')
  }
}

// 3️⃣ Creator 추상 클래스
abstract class Dialog {
  // Factory Method
  abstract createButton(): Button

  // 공통 비즈니스 로직 (템플릿 메서드)
  renderDialog(): void {
    console.log('📦 다이얼로그 렌더링 시작')
    const button = this.createButton()
    button.render()
    button.onClick()
    console.log('📦 다이얼로그 렌더링 완료')
    console.log('--------------------------------')
  }
}

// 4️⃣ ConcreteCreator: 구체 Creator 클래스
class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton()
  }
}

class MacDialog extends Dialog {
  createButton(): Button {
    return new MacButton()
  }
}

// 5️⃣ 클라이언트 코드
function clientApp(osType: string) {
  let dialog: Dialog

  if (osType === 'Windows') {
    dialog = new WindowsDialog()
  } else {
    dialog = new MacDialog()
  }

  console.log(`✅ OS 감지됨: ${osType}`)
  dialog.renderDialog()
}

// 6️⃣ 실행 예시
clientApp('Windows')
clientApp('Mac')

console.groupEnd()

export default function runFactoryMethodPattern(osType: string) {
  let dialog: Dialog

  switch (osType) {
    case 'Windows':
      dialog = new WindowsDialog()
      break
    case 'Mac':
      dialog = new MacDialog()
      break
    default:
      console.error('❌ 지원하지 않는 OS 타입입니다.')
      return
  }

  console.log(`✅ OS 감지됨: ${osType}`)
  dialog.renderDialog()
  console.groupEnd()
}
