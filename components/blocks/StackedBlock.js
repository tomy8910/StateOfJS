import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import _, { throttle } from 'lodash'
import { FILTERS, RESPONSES } from '../../helpers/constants.js'
import StackedBar from '../stackedbar/StackedBar.js'
import SectionTitle from './SectionTitle.js'
import ReactGA from 'react-ga'

class StackedBlock extends React.Component {
  constructor (props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.state = {
      filter: 'All',
    }
  }

  handleSelect (value) {
    this.setState({
      filter: value,
    })
    ReactGA.event({
      category: 'Stacked Chart',
      action: `Filter ${this.props.section} ${value}`,
    })
  }

  componentDidMount () {
    document.body.clientWidth
  }
  render () {
    const topOffset = 60
    return (
      <div className="section">
        {this.props.title ? <SectionTitle title={this.props.title} /> : null}
        <div className="section-inner">
          <StickyContainer className="sticky-container">
            <Sticky topOffset={-topOffset} stickyStyle={{ paddingTop: topOffset }} isActive={this.context.sticky} className="sticky-block">
              <StackedBar
                identifier="Option"
                title={this.props.title}
                data={this.props.data}
                responses={RESPONSES}
                filters={FILTERS}
                filter={this.state.filter}
                handleSelect={this.handleSelect}
                section={this.props.section}
              />
            </Sticky>
          </StickyContainer>
          <div className="section-contents">
            <this.props.contents />
          </div>
        </div>
      </div>
    )
  }
}

StackedBlock.propTypes = {
  title: React.PropTypes.string,
  section: React.PropTypes.string,
  contents: React.PropTypes.func,
  data: React.PropTypes.array,
}

StackedBlock.contextTypes = {
  sticky: React.PropTypes.bool,
}

export default StackedBlock
