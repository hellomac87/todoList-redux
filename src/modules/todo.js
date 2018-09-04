import { Map, List } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const INSERT = 'todo/INSERT';
const TOGGLE = 'todo/TOGGLE';
const REMOVE = 'todo/REMOVE';

export const insert = createAction(INSERT);
export const toggle = createAction(TOGGLE);
export const remove = createAction(REMOVE);

const initialState = List([
    Map({
        id : 0,
        text : '리액트 공부하기',
        done : true
    }),
    Map({
        id : 1,
        text : 'Learning React',
        done : false
    })
]);

export default handleActions({
    [INSERT] : (state, action) => {
        /* payload 안에 있는 id, text, done의 레퍼런스를 만들어 줍니다.
        레퍼런스를 만들지 않고, 바로 push(Map(action.payload))를 해도 되지만,
        나중에 이 코드를 보았을 때,
        이 액션이 어떤 데이터를 처리하는지 쉽게 볼 수 있도록 하는 작업입니다.
         */

        const {id, text, done} = action.payload;

        return state.push(Map({
            id,
            text,
            done
        }));
    },

    [TOGGLE] : (state, action) => {
        const {payload : index} = action;
        // = const index = action.payload;
        /* 비구조화 할당으로 index 레퍼런스에 action.payload 값을 넣습니다.
        이 작업이 필수는 아니지만, 나중에 이 코드를 보았을 때 여기에서 payload가
        어떤 값을 의미하는지 쉽게 이해할 수 있습니다.
         */

        // updateIn 으로 현재 값을 참조하여 반대 값으로 설정합니다.
        return state.updateIn([index, 'done'], done => !done);
        /* updateIn을 사용하지 않는다면 다음과 같이 작성할 수도 있습니다.
        return state.setIn([index, 'done], !state.getIn([0, index]));
        어떤 코드가 더 편해 보이나요? 둘 중에 여러분 맘에 드는 코드로 작성하면 됩니다.
        */
    },

    [REMOVE] : (state, action) => {
        const {payload : index} = action;
        return state.delete(index);
    }
}, initialState);