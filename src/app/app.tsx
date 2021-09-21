import React, { useState } from 'react';
import { Checkbox } from './components/checkbox';
import { Dropdown } from './components/dropdown';
import { DropdownItem } from './components/dropdown/dropdown-item';

export const AppComponent: React.FC = () => {
  const [ch1, setCh1] = useState(false);
  const [ch2, setCh2] = useState(true);
  const [drop1, setDrop1] = useState(2);

  return <div className={'app-container'}>
    <div className={'app-main-content'}>

      <h1>Mini starter</h1>
      <p>
        The project is a boilerplate for a React-based application or library.
        It inspired by <a href="https://github.com/shelfio/frontend-component-task" target={'_blank'}
                          rel={'noreferrer noopener'}>this</a> test
        task. It just turned out that I have no boilerplate for such small apps - without routing, state management,
        etc., but with &mdash;
      </p>
      <ul>
        <li>React</li>
        <li>Jest & Enzyme & Puppeteer & ESLint &mdash; Unit, Coverage, e2e</li>
        <li>LESS</li>
        <li>Typescript</li>
        <li>Webpack</li>
      </ul>

      <p>
        Project includes the build and test scripts and just a couple of UI component, to have what to test.
      </p>

      <h2>Components</h2>

      <h3>Checkbox</h3>
      <div style={{ width: '350px' }}>
        <Checkbox title={'Checkbox one'} checked={ch1} onChange={setCh1} tafPath={'checkbox1'}/>
        <Checkbox checked={ch1} onChange={setCh1}><b>Text</b></Checkbox>
        <Checkbox title={''} checked={ch1} onChange={setCh1}/>
        <Checkbox title={'Checkbox two/1'} checked={ch2} onChange={setCh2}/>
        <Checkbox title={'Checkbox two/2'} checked={ch2} onChange={setCh2} disabled tafPath={'checkbox2'}/>
        <Checkbox title={'Checkbox three with very long title here multiline content should be displayed somehow'}
                  checked={ch2} onChange={setCh2}/>
      </div>

      <h3>Dropdown</h3>
      <div>
        <Dropdown value={drop1} onChange={setDrop1} tafPath={'dropdown1'}>
          <DropdownItem value={'value 0'}>Item 0</DropdownItem>
          <DropdownItem value={'value 1'} tafPath={'item1'}>Item 1</DropdownItem>
          <DropdownItem value={2}>Item 2</DropdownItem>
          <DropdownItem value={3} disabled tafPath={'item2'}>Item 3</DropdownItem>
          <DropdownItem value={4}>Item 4</DropdownItem>
          <DropdownItem value={5} disabled={true}>Item 5</DropdownItem>
          <DropdownItem value={'bold'} disabled={false} tafPath={'item_bold'}><span>Item 6 with <b>bold</b> text</span></DropdownItem>
        </Dropdown>
        &nbsp;
        <Dropdown value={drop1} onChange={setDrop1} disabled tafPath={'dropdown2'}>
          <DropdownItem value={'value 0'}>Item 0</DropdownItem>
          <DropdownItem value={'value 1'} tafPath={'item1_1'}>Item 1</DropdownItem>
          <DropdownItem value={2}>Item 2</DropdownItem>
          <DropdownItem value={3} disabled tafPath={'item2_1'}>Item 3</DropdownItem>
          <DropdownItem value={4}>Item 4</DropdownItem>
          <DropdownItem value={5} disabled={true}>Item 5</DropdownItem>
          <DropdownItem value={'bold'} disabled={false}><span>Item 6 with <b>bold</b> text</span></DropdownItem>
        </Dropdown>
        &nbsp; <b>value:</b> {drop1}
      </div>

      <h3>Filler</h3>
      <p className={'filler'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis delectus dolor eius
        eligendi, illo,
        impedit ipsam iure laborum minima natus nihil officia quam repellat, repudiandae ullam unde voluptates.
        Distinctio, eligendi.
      </p>
      <p className={'filler'}>Animi architecto assumenda delectus deserunt dolor doloremque ducimus error est, ipsam
        iste minima molestias
        neque obcaecati perferendis perspiciatis reiciendis suscipit! Accusantium autem consequuntur et, ex labore
        molestiae mollitia nisi voluptatem.
      </p>
      <p className={'filler'}>Blanditiis distinctio eligendi et expedita fuga minus quaerat quo tempora. Dolores,
        eligendi, ipsam. Ducimus
        exercitationem inventore labore recusandae sunt, vitae. Cupiditate dignissimos dolorem ex iusto laboriosam odit
        recusandae soluta voluptatem?
      </p>
      <p className={'filler'}>Consequuntur dolor doloremque eum, illo maiores natus necessitatibus quos sequi voluptate
        voluptates.
        Deleniti deserunt, doloremque est exercitationem illo iste magnam molestias praesentium quidem saepe, sed
        similique soluta suscipit tempora vitae.
      </p>
      <p className={'filler'}>A ab adipisci aliquam, aut beatae blanditiis commodi consequatur cum eos est et expedita
        itaque maiores,
        maxime mollitia odio perferendis praesentium quisquam, reiciendis rem rerum sed sit temporibus? Laboriosam,
        molestiae?
      </p>
      <p className={'filler'}>Animi aperiam, aspernatur at dolorem dolores esse harum impedit incidunt ipsam itaque
        iusto minima, molestias
        perferendis perspiciatis quaerat quasi qui quod rerum soluta sunt suscipit ullam vero? Corporis, similique,
        ullam.
      </p>
      <p className={'filler'}>Aliquid aperiam ex incidunt magnam numquam placeat qui quod saepe? A alias dicta est fugit
        necessitatibus
        odit officia placeat ut? Ducimus enim necessitatibus officia porro rem sunt unde! Impedit, neque?
      </p>
      <p className={'filler'}>Atque eum eveniet molestias rem. Ab accusantium amet, consectetur distinctio doloremque ea
        enim fugit ipsa
        itaque, iusto magnam minus nulla numquam praesentium, quibusdam quod quos tenetur veritatis. Accusamus, dolor,
        maxime.
      </p>
    </div>
  </div>;
};
