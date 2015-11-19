/* global describe, it */

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import chai from 'chai';

const expect = chai.expect;

class HelloWorld extends React.Component {
    render() {
        return <div><strong>Hello, world.</strong></div>;
    }
}

describe('Example test of', function() {
    it('react hello world component', function () {
        const shallowRenderer = ReactTestUtils.createRenderer();
        shallowRenderer.render(<HelloWorld />);
        const result = shallowRenderer.getRenderOutput();

        expect(result.type).to.be.equal('div');
    });
});
