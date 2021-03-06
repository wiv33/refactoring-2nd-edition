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

### Like to
    
    퍼사드 걷어내기
    간접 호출 제거하기
    
### 절차
    1. 다형 메서드인지 확인한다.
    2. 인라인할 함수를 호출하는 곳을 모두 찾는다.
    3. 각 호출문을 함수 본문으로 교체한다.
    4. 하나씩 교체할 때마다 테스트한다.
    5. 함수 정의(원래 함수)를 삭제한다.

## 6.3 변수 추출하기

### Like to

    표현식을 지역 변수로 명시
    요약문 만드는 느낌

### 절차

    1. 추출하려는 표현식에 부작용은 없는지 확인한다.
    2. 불변 변수를 하나 선언하고 이름을 붙일 표현식의 복제본을 대입한다.
    3. 원본 표현식을 새로 만든 변수로 교체한다.
    4. 테스트한다.
    5. 표현식을 여러 곳에서 사용한다면 각각을 새로 만든 변수로 교체한다. 하나 교체할 때마다 테스트한다.
    
## 6.4 변수 인라인하기

### Like to

    임시 변수 제거
    하나의 state로 변경
    인라인으로 변경
    
### 절차
    
    1. 대입문의 우변(표현식)에서 부작용이 생기지는 않는지 확인한다.
    2. 변수가 불변으로 선언되지 않았다면 불변으로 만든 후 테스트한다.
    3. 이 변수를 가장 처음 사용하는 코드를 찾아서 대입문 우변의 코드로 바군다.
    4. 테스트한다.
    5. 변수를 사용하는 부분을 모두 교체할 때까지 이 과정을 반복한다.
    6. 변수 선언문과 대입문을 지운다.
    7. 테스트한다.
    
## 6.5 함수 선언 바꾸기

### Like to
    
    핵심 요약문으로 만들기
    
        통에 액체를 담을 수 있고, 플라스틱 호스가 안에 꽂혀 있으며, 호스와 연결된 압력이 생기는 손잡이로
        펌프질을 하여 물을 고르게 뿌릴 수 있는 것.
        스프레이
        
### 절차

    * 간단한 절차
        1. 매개변수를 제거하려거든 먼저 함수 본문에서 제거 대상 매개변수를 **참조하는 곳이 없는지 확인**한다.
        2. 메서드 선언을 원하는 형태로 바꾼다.
        3. 기존 메서드 선언을 참조하는 부분을 모두 찾아서 바뀐 형태로 수정한다.
            + Ctrl + Shift + M by IDEA (extract method)
        4. 테스트한다.

## 6.6 변수 캡슐화 하기

###Like to

    데이터 유효 범위의 축소

### 절차
    
    1. 변수로의 접근과 갱신을 전담하는 캡슐화 함수들을 만든다.
    2. 정적 검사를 수행한다.
    3. 변수를 직접 참조하던 부분을 모두 적절한 캡슐화 함수 호출로 바꾼다.
       하나씩 바꿀 때마다 테스트한다.
    4. 변수의 접근 범위를 제한한다.
    5. 테스트한다.
    6. 변수 값이 레코드라면 레코드 캡슐화하기를 적용할지 고려해본다.

## 6.7 변수 이름 바꾸기

### Like to

    명확한 프로그래밍의 핵심은 이름 짓기

### 절차
    
    1. 폭넓게 쓰이는 변수라면 변수 캡슐화하기를 고려한다.
    2. 이름을 바꿀 변수를 참조하는 곳을 모두 찾아서, 하나씩 변경한다.
        + 다른 코드베이스에서 참조하는 변수는 외부에 공개된 변수이므로 이 리팩터링을 적용할 수 없다.
    3. 테스트한다.

## 6.8 매개변수 객체 만들기

### Like to
    
    데이터 뭉치
    
### 절차

    1. 적당한 데이터 구조가 아직 마련되어 있지 않다면 새로 만든다.
    2. 테스트한다.
    3. 함수 선언 바꾸기로 새 데이터 구조를 매개변수로 추가한다.
    4. 테스트한다.
    5. 함수 호출 시 새로운 데이터 구조 인스턴스를 넘기도록 수정한다. 하나씩 수정할 때마다 테스트한다.
    6. 기존 매개변수를 사용하던 코드를 새 데이터 구조의 원소를 사용하도록 바꾼다.
    7. 다 바궜다면 기존 매개변수를 제거하고 테스트한다.
    
   
## 6.9 여러 함수를 클래스로 묶기

### Like to

    Published
    interface
    
### 절차

    1. 함수들이 공유하는 공통 데이터 레코드를 캡슐화한다.
    2. 공통 레코드를 사용하는 함수 각각을 새 클래스로 옮긴다.
    3. 데이터를 조작하는 조직들은 함수로 추출해서 새 클래스로 옮긴다.
    

## 6.10 여러 함수를 변환 함수로 묶기

### Like to
    
    여러 함수 클래스로 묶기 6.9
    grouping

### 절차

    1. 변환할 레코드를 입력받아서 값을 그대로 반환하는 변환 함수를 만든다.
    2. 묶을 함수 중 함수 하나를 골라서 본문 코드를 변환 함수로 옮기고, 처리 결과를 레코드에 새 필드로 기록한다. 그런 다음 클라이언트 코드가 이 필드를 사용하도록 수정한다.
    3. 테스트한다.
    4. 나머지 관련 함수도 위 과정에 따라 처리한다.


## 6.11 단계 쪼개기

### Like to

    단일 책임 원칙
    
### 절차

    1. 두 번째 단계에 해당하는 코드를 독립 함수로 추출한다
    2. 테스트한다.
    3. 중간 데이터 구조를 만들어서 앞에서 추출한 함수의 인수로 추가한다.
    4. 테스트 한다.
    5. 추출한 두 번째 단계 함수의 매개변수를 하나씩 검토한다. 그중 첫 번째 단계에서 사용되는 것은 중간 데이터 구조로 옮긴다. 하나씩 옮길 때마다 테스트한다.
    6. 첫 번째 단계 코드를 함수로 추출하면서 중간 데이터 구조를 반환하도록 만든다.
           

Chapter 07 (캡슐화)
===

## 7.1 레코드 캡슐화 하기

### Like to
    
    레코드 객체화
    
### 절차

    1. 레코드를 담은 변수를 캡슐화한다.
    2. 레코드를 감싼 단순한 클래스로 해당 변수의 내용을 교체한다. 
    이 클래스에 원본 레코드를 반환하는 접근자도 정의하고, 변수를 캡슐화하는 함수들이 이 접근자를 사용하도록 수정한다.
    3. 테스트한다.
    4. 원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수들을 새로 만든다.
    5. 레코드를 반환하는 예전 함수를 사용하는 코드를 4에서 만든 새 함수를 사요하도록 바꾼다.
       필드를 접근할 때는 객체의 접근자를 사용한다. 적절한 접근자가 없다면 추가한다. 한 부분을 바꿀 때마다 테스트한다.
    6. 클래스에서 원본 데이터를 반환하는 접근자와 원본 레코드를 반환하는 함수들을 제거한다.
    7. 테스트한다.
    8. 레코드의 필드도 데이터 구조인 중첩 구조라면 레코드 캡슐화하기와 컬렉션 캡슐화하기를 재귀적으로 적용한다.
    
## 7.2 컬렉션 캡슐화하기

### Like to

    가변 데이터 캡슐화
    
### 절차

    1. 아직 컬렉션을 캡슐화하지 않았다면 변수 캡슐화하기부터 한다.
    2. 컬렉션에 원소를 추가/제거하는 함수를 추가한다.
    3. 정적 검사를 수행한다.
    4. 컬렉션을 참조하는 부분을 모두 찾는다. 컬렉션의 변경자를 호출하는 코드가 모두 앞에서 추가한 추가/제거 함수를 호출하도록 수정한다.
       하나씩 수정할 때마다 테스트한다.
    5. 컬렉션 게터를 수정해서 원본 내용을 수정할 수 없는 읽기전용 프락시나 복제본을 반환하게 한다.
    6. 테스트한다.
    
## 7.3 기본형을 객체로 바꾸기

    
### 절차 

    1. 아직 변수를 캡슐화하지 않았다면 캡슐화한다.
    2. 단순한 값 클래스를 만든다.
    3. 정적 검사를 수행한다.
    4. 값 클래스의 인스턴스를 새로 만들어서 필드에 저장하도록 세터를 수정한다.
    5. 새로 만든 클래스의 게터를 호출한 결과를 반환하도록 게터를 수정한다.
    6. 테스트한다.
    7. 함수 이름을 바꾸면 원본 접근자의 동작을 더 잘 드러낼 수 있는지 검토한다.
  
  
Chapter 08 (기능 이동)
===

    요소를 다른 컨텍스트로 옮기는 작업
    
* **함수 옮기기**
* **필드 옮기기**
* **문장을 함수로 옮기기**
* **문장을 호출한 곳으로 옮기기**
* **문장 슬라이드 하기**
* **인라인 코드를 함수 호출로 바꾸기**
* **반복문 쪼개기**
* **반복문을 파이프라인으로 바꾸기**
* **죽은 코드 제거하기**


    좋은 소프트웨어 설계의 핵심은 `모듈성`

Chapter 09 (데이터 조직화)
===

* **변수 쪼개기**
* **변수 이름 바꾸기**
* **피생 변수를 질의 함수로 바꾸기** 
* **참조를 값으로 바꾸기**
* **값을 참조로 바꾸기**

Chapter 10 (조건부 로직 간소화)
===

    이해하기 쉬운 문장으로 변환
    가변 변수를 제거하면 자다가도 떡이 생긴다.


* **조건문 분해하기**
* **중복 조건식 통합하기**
* **중첩 조건문을 보호 구문으로 바꾸기**
* **조건부 로직을 다형성으로 바꾸기**
* **특이 케이스 추가하기** 
* **널 객체 추가하기**
* **어서션 추가하기**



Chapter 11 (API 리팩터링)
===
    
    질의 함수는 모두 부수효과가 없어야 한다.


* **질의 함수와 변경 함수 분리하기**
* **함수 매개변수화하기**
* **플래그 인수 제거하기**
* **객체 통째로 넘기기**
* **매개변수를 질의 함수로 바꾸기**
* **질의 함수를 매개변수로 바꾸기**
* **세터 제거하기**
* **생성자를 팩터리 함수로 바꾸기**
* **함수를 명령으로 바꾸기**
* **명령을 함수로 바꾸기**
    


Chapter 12 (상속 다루기)
===



* **메서드 올리기**
* **필드 올리기**
* **생성자 본문 올리기**
* **메서드 내리기**
* **필그 내리기**
* **슈퍼클래스 추출하기**
* **서브클래스 제거하기**
* **계층 합치기**
* **타입 코드를 서브클래스로 바꾸기**
* **서브클래스를 위임으로 바꾸기**
* **슈퍼클래스를 위임으로 바꾸기**

