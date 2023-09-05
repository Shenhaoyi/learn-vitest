import HelloWorld from './HelloWorld.vue';
import { mount }  from '@vue/test-utils';

test('hello', () => {
  const wrapper = mount(HelloWorld)
  expect(wrapper.text()).toContain('hello world')
});
