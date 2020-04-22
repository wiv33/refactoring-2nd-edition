# refactoring-2nd-edition
리팩터링 2판 정리

Chapter 01
===

프로그램이 새로운 기능을 추가하기에 편한 구조가 아니라면,
기능을 추가하기 쉬운 형태로 리팩터링 후 기능을 추가한다.

리팩터링 전 테스트 코드를 먼저 작성한다.
테스트는 반드시 자가진단하도록 만든다.

컴파일 - 테스트 - 커밋
컴파일 - 테스트 - 커밋

한 단위가 완성되면 push


조금씩 변경하고 매번 테스트 하는 것은 리팩터링 절차의 핵심이다.

- 추출작업 전 지역 변수부터 제거한다.
메서드의 반복 호출이 되더라도 인라인으로 바꾸면서 지역 변수를 제거한다.

- 리팩터링으로 성능의 저하가 걱정된다면, 먼저 개의치 말고 리팩터링을 진행하라.
잘 다듬어진 코드로 개선 후 심각한 성능 이슈를 다시 리팩터링 한다.

정리:
원본 기능의 단위를 여러 개로 쪼개서 코드가 수행하는 기능을 더 분명하게 드러낸다.

리팩터링은 코드가 하는 일을 파악하는 데서 시작한다.

좋은 코드를 가늠하는 확실한 방법은
얼마나 수정하기 쉬운가이다.


Chapter 02
===

### 리팩터링 원칙


리팩터링: 소프트웨어의 겉보기 동작은 그대로 유지한 채, 여러 가지 리팩터링 기법을 적용해서 소프트웨어를 재구성하다.

- 아키텍처를 충분히 이해하지 못한 채 단기 목표만을 위해 코드를 수정하다 보면 기반 구조가 무너지기 쉽다.


### 리팩터링

- 준비를 위한 리팩터링: 기능을 쉽게 추가할 수 있도록 만들기

- 이해를 위한 리팩터링: 코드를 이해하기 쉽도록 만들기

- 쓰레기 줍기 리팩터링
(이해하기 위한 리팩터링의 변경)
=> 비효율적으로 처리하는 덩치 큰 기능은 처리할 수 있는 것만 즉시 고친 후 메모를 남긴다 (다음으로 미루기)

### 리팩터링 시 고려할 문제


- 테스팅: 리팩터링을 하기 위해서는 자가 테스트 코드를 마련해야 한다.

___기능의 변동은 없어야한다___

- 레거시 코드: 레거시 시스템을 파악할 때 리팩터링이 많은 도움이 된다. 
-> 프로그램에서 테스트를 추가할 틈새를 찾아서 시스템을 테스트해야 한다는 의미.
코드를 접할 때마다 예전보다 조금이라도 개선하는 노력하는 것.

---

#### 익스트림 프로그래밍의 원칙

    
> 당장에 필요한 기능만으로 최대한 간결하게 만들라

---

### 리팩터링 - 개발 프로세스


> 애자일 방법론에 포함된 기술적인 내용

* 애자일 방법론
    + 테스트 주도 개발
        - 자가 테스트 코드
        - 리팩터링
    + 지속적 통합
    + 지속적 배포


### 리팩터링과 성능


> 성능이 느려질 수는 있으나,   
> 튜닝하기 쉽게 만들고 나서 원하는 속도가 나게끔 튜닝하는 방향을 제시

* 리팩터링 워크북 - 윌리엄 웨이크
* 패턴을 활용한 리팩터링 - 조슈아 케리에프스키
* 레거시 코드 활용 전략 - 마이클 페더스

Chapter 03 (코드의 악취)
===

* 기이한 이름
    - 마땅한 이름이 떠오르지 않는다면 설계에 더 근본적인 문제의 여지
* 중복 코드
    - ___함수 추출하기___
    - ___문장 슬라이드하기___
    - ___메서드 올리기___
     
* 긴 함수
    - 적극적으로 함수를 쪼개야 한다.   
    (주석을 달아야 할 만한 부분은 무조건 함수로)
    - 함수 이름은 동작 방식이 아닌 **의도가 드러나게 짓는다**   
    (무엇을 하는지 코드가 설명하지 못할수록 함수로)
    - ___함수 추출하기___   
    (함수 짧게 만드는 99%)
    - ___임시 변수를 질의 함수로 바꾸기___
    - ___매개변수 객체 만들기___
    - ___객체 통째로 넘기기___
    - ___함수를 명령으로 바꾸기___
    - ___조건문 분해하기___
        * ___함수 추출하기___
        * ___조건문을 다형성으로 바꾸기___
        * ___반복문 쪼개기___

* 긴 매개변수 목록
    - ___매개변수를 질의 함수로 바꾸기___
    - ___객체 통째로 넘기기___
    - ___매개변수 객체 만들기___
    - ___플래그 인수 제거하기___
    - ___여러 함수를 클래스로 묶기___
    
...

Chapter 04 (테스트 구축하기)
===

* **자주 테스트하라.**
* **완벽하게 만드느라 테스트를 수행하지 못하느니, 불완전한 테스트라도 작성해 실행하는 게 낫다.**

Chapter 05 (리팩터링 카탈로그 보는 법)
===

> 리팩터링 설명 형식
>   > * 이름
>   > * 개요
>   > * 배경
>   > * 절차
>   > * 예시
>
Chapter 06 (기본적인 리팩터링)
===

## 6.1 함수 추출하기

### Like to
   
    퍼사드 패턴
    함수로 묶기
    함수로 분류하기

### 절차
    1. 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다. (**'어떻게'**가 아닌 **'무엇을'** 하는지가 드러나야 한다.)    
    2. 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여넣는다.
    3. 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 없는지 검사한다. 있다면 매개변수로 전달한다.
    4. 변수를 다 처리했다면 컴파일한다.
    5. 원본 함수에서 추출한 코드 부분을 새로 만든 함수를 호출하는 문장으로 바꾼다(즉, 추출한 함수로 일을 위임한다.)
    6. 테스트한다.
    7. 다른 코드에 방금 추출한 것과 똑같거나 비슷한 코드가 없는지 살핀다. 있다면 방금 추출한 새 함수를 호출하도록 바굴지 검토한다(인라인 코드를 함수 호출로 바꾸기)
        
## 6.2 함수 인라인하기

### like to
    
    퍼사드 걷어내기
    간접 호출 제거하기
    
### 절차
    1. 다형 메서드인지 확인한다.
    2. 인라인할 함수를 호출하는 곳을 모두 찾는다.
    3. 각 호출문을 함수 본문으로 교체한다.
    4. 하나씩 교체할 때마다 테스트한다.
    5. 함수 정의(원래 함수)를 삭제한다.
