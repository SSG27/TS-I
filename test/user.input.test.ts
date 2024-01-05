import React from 'react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

it('updates state on user input', () => {
  // Create a snapshot for the initial rendering
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // Manually trigger user input for movie title
  renderer.act(() => {
    userEvent.type(tree.children[1].children[5], 'dunkirk');
  });

  // Re-rendering after user input
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // Manually trigger user input for country code
  renderer.act(() => {
    userEvent.type(tree.children[1].children[5], 'gb');
    userEvent.click(tree.children[5]);
  });

  // Re-rendering after user input
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
