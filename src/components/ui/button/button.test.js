import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button';

it('Кнопка c текстом рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button text="Рецепт пельменей" />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Кнопка без текста рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button />)
      .toJSON();
      expect(tree).toMatchSnapshot();
}); 

it('Заблокированная кнопка рендерится без ошибок', () => {
const tree = renderer
    .create(<Button disabled={true} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 

it('Кнопка с индикацией загрузки рендерится без ошибок', () => {
    const tree = renderer
        .create(<Button isLoader={true} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    }); 

it('Нажатие на кнопку вызывает корректный callback', () => {
    window.alert = jest.fn();

    render(<Button text="Рецепт пельменей" onClick={()=>{alert('Ура! Пельмени!')}}/>)

        const button = screen.getByText("Рецепт пельменей");

    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('Ура! Пельмени!');
}); 