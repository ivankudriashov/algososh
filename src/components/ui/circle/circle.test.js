import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { ElementStates } from "../../../types/element-states";

import { Circle } from './circle';

it('Пустой круг рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Круг с буквами рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle letter="B" />)
      .toJSON();
      expect(tree).toMatchSnapshot();
}); 

it('Круг с head рендерится без ошибок', () => {
const tree = renderer
    .create(<Circle head="3" />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Круг с react-элементом в head рендерится без ошибок', () => {
    const tree = renderer
        .create(<Circle head={<Circle isSmall={true}/>} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
});

it('Круг с tail рендерится без ошибок', () => {
    const tree = renderer
        .create(<Circle tail="4" />)
        .toJSON();
        expect(tree).toMatchSnapshot();
}); 

it('Круг с react-элементом в tail рендерится без ошибок', () => {
    const tree = renderer
        .create(<Circle tail={<Circle isSmall={true}/>} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
});

it('Круг с index рендерится без ошибок', () => {
    const tree = renderer
        .create(<Circle index="2" />)
        .toJSON();
        expect(tree).toMatchSnapshot();
});

it('Круг с пропом isSmall ===  true рендерится без ошибок', () => {
    const tree = renderer
        .create(<Circle isSmall={true}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
});

it('Круг в состоянии default рендерится без ошибок', () => {
    const tree = renderer
        .create(<Circle state={ElementStates.Default} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
});

it('Круг в состоянии changing рендерится без ошибок', () => {
    const tree = renderer
        .create(<Circle state={ElementStates.Modified} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
});

it('Круг в состоянии modified рендерится без ошибок', () => {
    const tree = renderer
        .create(<Circle state={ElementStates.Changing} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
});

