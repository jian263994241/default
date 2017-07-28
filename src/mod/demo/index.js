import React, {Component} from 'react'
import {render} from 'react-dom'
import {Page, PageContent} from 'wonder'

export default class OtherPage extends Component {
  render() {
    return (
      <Page title="更多页面">
        <PageContent>
          //render
          //div.page-content
        </PageContent>
      </Page>
    );
  }
}
