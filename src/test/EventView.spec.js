// Import the necessary dependencies
// npm install vue-jest@next
// npm run test:unit
// to run test

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils';
import EventView from '../views/EventView.vue';

describe('Populating The Event Page with Events', () => {
    it('renders properly', () => {
      const wrapper = mount(EventView);
      
      // Verify that it renders without errors
      expect(wrapper.exists()).toBe(true);

      // Check if the div is created 
      const divElement = wrapper.find('[data-testid="events-container"]');
      const hasEvents = wrapper.vm.events.length > 0;
      if (hasEvents) {
        expect(divElement.exists()).toBe(true);
      } else {
        expect(divElement.exists()).toBe(false);
      }
    })
})


