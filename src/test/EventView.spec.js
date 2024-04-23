// Import the necessary dependencies
// npm install vue-jest@next
// npm run test:unit
// to run test
// Author: Joesph Lebron

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

describe('CLicking the Up/Down vote buttons', () => {
  it('upvotes an event and updates the UI', async () => {
    const wrapper = mount(EventView);

    console.log(wrapper.html());

    // Debug: Log the number of elements found in the selector
    console.log(wrapper.findAll('.event-item p:nth-child(4)').length);

    // Get the initial number of upvotes displayed in the UI
    const initialUpvotes = parseInt(wrapper.find('.event-item p:nth-child(4)').text().split(':')[1].trim());

    // Simulate clicking the "Upvote" button
    await wrapper.find('button').filter(button => button.text() === 'Upvote').trigger('click');

    // Get the updated number of upvotes displayed in the UI
    const updatedUpvotes = parseInt(wrapper.find('.event-item p:nth-child(4)').text().split(':')[1].trim());

    // Assert that the number of upvotes has increased by 1
    expect(updatedUpvotes).toBe(initialUpvotes + 1);
  });

  it('downvotes an event and updates the UI', async () => {
    const wrapper = mount(EventView);

    console.log(wrapper.html());

    console.log(wrapper.findAll('.event-item p:nth-child(4)').length);
    
    // Get the initial number of upvotes displayed in the UI
    const initialUpvotes = parseInt(wrapper.find('.event-item p:nth-child(4)').text().split(':')[1].trim());

    // clicking the Downvote button
    await wrapper.find('button').filter(button => button.text() === 'Downvote').trigger('click');

    // Get the updated number of upvotes displayed in the UI
    const updatedUpvotes = parseInt(wrapper.find('.event-item p:nth-child(4)').text().split(':')[1].trim());

    // Assert that the number of upvotes has decreased by 1
    expect(updatedUpvotes).toBe(initialUpvotes + 1);
  });
  
});


