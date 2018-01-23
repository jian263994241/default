import React, {Component} from 'react';
import {render} from 'react-dom';
import {Page, PageContent, Button, ContentBlock, ContentBlockTitle, Grid, Link} from 'wonder';
import {inject, observer} from 'mobx-react';
const {Row, Col} = Grid;

@inject('UIState')
@observer
export default class IndexPage extends Component {

  showPreloader = ()=>{
    const {UIState} = this.props;
    UIState.showPreloader = true;

    setTimeout(()=>{
      UIState.showPreloader = false;
    }, 1000);
  }

  render() {
    return (
      <Page title="首页">
        <PageContent>
          <ContentBlockTitle>
            首页
          </ContentBlockTitle>
          <ContentBlock>
            <Row>
              <Col>
                <Button onClick={this.showPreloader}>showPreloader</Button>
              </Col>
              <Col>
                <Link to="other">下一页</Link>
              </Col>
            </Row>
          </ContentBlock>
        </PageContent>
      </Page>
    );
  }
}
