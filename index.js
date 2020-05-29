import {createStore} from 'redux';  //리덕스의 createStore


//html 의 class , 태그 , id 별  참조하기위한 변수선언
const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#Decrease');

//액션타입 만들어놓기
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const toggleSwitch = ()=>({type:TOGGLE_SWITCH});
const increase = difference =>({type:INCREASE , difference});  //increase 호출할때 함수처럼쓰고 difference를변서처럼 사용능합니다.
const decrease = ()=>({type:DECREASE});


//초기화
const initialState ={
  toggle:false,
  counter:0
}


//state가 undefined 일때  initialState를 초깃값으로 설정합니다.
function reducer(state = initialState, action){
  switch (action.type) {
    case TOGGLE_SWITCH: return{
          ...state,   //불변성 유지 때문이라고 합니다.  state값을 미리 전개해줘서 값을 넘겨줍니다.  ... 은 전개의 표현입니다.
          toggle: !state.toggle
    };
    case INCREASE: return{
          ...state,
          counter:state.counter+action.difference
    };
    case DECREASE: return{
          ...state,
          counter:state.counter-1
    };
    default:
      return state;
  }
}
//리듀서 부분
const store = createStore(reducer);  //스토어 선언할때 리듀서 받아오길래 걍 reducer밑에 생성하였습니다. 다른곳에있어도 상관 없음

const render=()=>{
  const state = store.getState();   //현재상태를 불러옵니다.
  //토글처리
  if(state.toggle){
    divToggle.classList.add('active');
  }else{
    divToggle.classList.remove('active');
  }
  console.log(divToggle.classList); //슈뻘 다 콘솔찍어봐야한다 classList -> 이름을 추가해준다. css랑 비교해보면 쓰는이유를안다.
  //카운터처리
  counter.innerText=state.counter;
};

render();
//스토어 구독하기  스토어 구독해놓아서  스토어 바뀌면 렌더를 다시해줌  일단은지 직접 subscribe 하지만 완성형이 아님.
store.subscribe(render);

//이거 없어도 실행됨 구독 등록해놓으면 계속띄워주려는 의도같음 구독 비활성화도있다고함 참고
/*
    const listener = () =>{
      console.log('상태가 업데이트 됨');
    }
    const unsubscribe = store.subscribe(listener);
    unsubscribe();  //추후 구독을 비활성화할때 함수를 호출
*/

//액션 부분
divToggle.onclick = () =>{
  store.dispatch(toggleSwitch());
    console.log('divToggle onClick 됨');
};

btnIncrease.onclick = () =>{
  store.dispatch(increase(1));
  console.log('btnIncrease onClick 됨');
};

btnDecrease.onclick = () =>{
  store.dispatch(decrease());
    console.log('btnDecrease onClick 됨');
};
