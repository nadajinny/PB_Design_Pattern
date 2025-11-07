// ===========================================================
// 07-16. Visitor Pattern
// ===========================================================

console.group("====== [Visitor Design Pattern] ======");

// 1️⃣ Visitor 인터페이스
interface Visitor {
  visitFile(file: FileElement): void;
  visitFolder(folder: FolderElement): void;
}

// 2️⃣ Element 인터페이스
interface Element {
  accept(visitor: Visitor): void;
}

// 3️⃣ 구체적인 Element 클래스들
class FileElement implements Element {
  constructor(public name: string, public size: number) {}

  accept(visitor: Visitor): void {
    visitor.visitFile(this); // 이중 디스패치 발생
  }
}

class FolderElement implements Element {
  constructor(public name: string, public children: Element[] = []) {}

  accept(visitor: Visitor): void {
    visitor.visitFolder(this);
  }
}

// 4️⃣ 구체적인 Visitor 클래스들

// (1) 크기 계산기
class SizeCalculator implements Visitor {
  private totalSize = 0;

  visitFile(file: FileElement): void {
    this.totalSize += file.size;
  }

  visitFolder(folder: FolderElement): void {
    folder.children.forEach(child => child.accept(this));
  }

  getTotalSize(): number {
    return this.totalSize;
  }
}

// (2) 이름 출력기
class NamePrinter implements Visitor {
  private indent = 0;

  visitFile(file: FileElement): void {
    console.log(`${" ".repeat(this.indent)}📄 파일: ${file.name}`);
  }

  visitFolder(folder: FolderElement): void {
    console.log(`${" ".repeat(this.indent)}📁 폴더: ${folder.name}`);
    this.indent += 2;
    folder.children.forEach(child => child.accept(this));
    this.indent -= 2;
  }
}

// (3) JSON 출력 Visitor
class JsonPrinter implements Visitor {
  visitFile(file: FileElement): void {
    console.log(JSON.stringify({ type: "file", name: file.name, size: file.size }, null, 2));
  }

  visitFolder(folder: FolderElement): void {
    console.log(JSON.stringify({ type: "folder", name: folder.name }, null, 2));
    folder.children.forEach(child => child.accept(this));
  }
}

// 5️⃣ 실행 함수 (Vue에서 import해서 호출)
export default function runVisitorPattern() {
  console.log("✅ Visitor 패턴 시뮬레이션 시작");

  // 파일 시스템 구성
  const file1 = new FileElement("a.txt", 10);
  const file2 = new FileElement("b.txt", 20);
  const file3 = new FileElement("c.log", 15);
  const subFolder = new FolderElement("logs", [file3]);
  const rootFolder = new FolderElement("docs", [file1, file2, subFolder]);

  // Visitor 1: 크기 계산
  const sizeVisitor = new SizeCalculator();
  rootFolder.accept(sizeVisitor);
  console.log(`📦 총 파일 크기: ${sizeVisitor.getTotalSize()} KB`);

  // Visitor 2: 이름 출력
  const nameVisitor = new NamePrinter();
  rootFolder.accept(nameVisitor);

  // Visitor 3: JSON 출력
  const jsonVisitor = new JsonPrinter();
  rootFolder.accept(jsonVisitor);

  console.log("✅ Visitor 패턴 시뮬레이션 종료");
  console.groupEnd();
}
