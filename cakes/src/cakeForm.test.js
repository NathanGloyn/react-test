import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon'; 
import CakeForm from './cakeForm';
import update from 'react-addons-update';

let cake = {
  title: "Lemon Cake",
  desc: "A lemon cake",
  image: "lemoncake.jpg"
}

describe('when creating component', () => {

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CakeForm />, div);
  })

  it('state not set if no values provided', () => {
    const form = shallow(<CakeForm />);

    expect(form.state().title).toBe("");
    expect(form.state().desc).toBe("");
    expect(form.state().image).toBe("");
  });

  it('should set state if values provided', () => {
    const form = shallow(<CakeForm cake={cake} />);

    expect(form.state().title).toBe("Lemon Cake");
    expect(form.state().desc).toBe("A lemon cake");
    expect(form.state().image).toBe("lemoncake.jpg");  
  });

})

describe('when validating input', ()=> {

  let form;

  beforeEach(()=> {
    form = shallow(<CakeForm title="" desc="" image="" />);
  })

  describe('status should be updated', () => {
    it('if the title is invalid', ()=> {
      let titleInput = form.find('#title');
      titleInput.simulate('blur', {target: { id: 'title', value: null } });

      expect(form.state().status.title).toBe("You must enter this value");
    });

    it('if the desc is invalid', ()=> {
      let descInput = form.find('#desc');
      descInput.simulate('blur', {target: { id: 'desc', value: null } });

      expect(form.state().status.desc).toBe("You must enter this value");
    });

    it('if the image is invalid', ()=> {
      let imageInput = form.find('#image');
      imageInput.simulate('blur', {target: { id: 'image', value: null } });

      expect(form.state().status.image).toBe("You must enter this value");
    });
  });

  describe('validation message', ()=> {
    it('should display title message if value invalid', ()=>{
      let titleInput = form.find('#title');
      titleInput.simulate('blur', {target: { id: 'title', value:null } });

      let titleError = form.find('#titleError')
      expect(titleError.length).toBe(1);
      expect(titleError.text()).toBe("You must enter this value")
    });

    it('should display desc message if value invalid', ()=>{
      let titleInput = form.find('#desc');
      titleInput.simulate('blur', {target: { id: 'desc', value:null } });

      let titleError = form.find('#descError')
      expect(titleError.length).toBe(1);
      expect(titleError.text()).toBe("You must enter this value")
    });

    it('should display image message if value invalid', ()=>{
      let titleInput = form.find('#image');
      titleInput.simulate('blur', {target: { id: 'image', value:null } });

      let titleError = form.find('#imageError')
      expect(titleError.length).toBe(1);
      expect(titleError.text()).toBe("You must enter this value")
    })  

    it('should hide title message if value valid', () =>{
        let titleInput = form.find('#title');
        titleInput.simulate('blur', {target: { id: 'title', value: null } });

        titleInput.simulate('blur', {target: { id: 'title', value: "title" } });
        let titleError = form.find('#titleError')
        expect(titleError.length).toBe(0);
    })

    it('should hide desc message if value valid', () =>{
        let descInput = form.find('#desc');
        descInput.simulate('blur', {target: { id: 'desc', value: null } });

        descInput.simulate('blur', {target: { id: 'desc', value: "description" } });
        let descError = form.find('#descError')
        expect(descError.length).toBe(0);
    })

    it('should hide image message if value valid', () =>{
        let imageInput = form.find('#image');
        imageInput.simulate('blur', {target: { id: 'image', value: null } });

        imageInput.simulate('blur', {target: { id: 'image', value: "image url" } });
        let descError = form.find('#imageError')
        expect(descError.length).toBe(0);
    })

  })

})



describe('when using callbacks', () => {
  it('Executes cancel callback', () => {
    let buttonSpy = sinon.spy();
    
    const form = mount(<CakeForm onCancel={buttonSpy} />).find('#cancel');

    form.simulate('click');
    expect(buttonSpy.called).toBe(true);
  });  

  it('Executes submit callback when state is valid', () => {
    let buttonSpy = sinon.spy();

    const form = mount(<CakeForm onSubmit={buttonSpy} />);
    const submit = form.find('form');

    form.setState({title: 'cake title', desc: 'cake desc', image: 'cake image'});

    form.setState({status: { valid: true } });

    submit.simulate('submit');
    
    expect(buttonSpy.called).toBe(true);
  });

  it('does not execute callback if state is not valid', () => {
    let buttonSpy = sinon.spy();

    const form = mount(<CakeForm onSubmit={buttonSpy} />);
    const submit = form.find('form');

    submit.simulate('submit');
    
    expect(buttonSpy.called).toBe(false);

  })

})

