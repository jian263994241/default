import React, {Component} from 'react';
import {render} from 'react-dom';
import {Page, PageContent, Link} from 'wonder-ui/Core';
import Button from 'wonder-ui/Button';
import {GridRow, GridCol} from 'wonder-ui/Grid';
import {showPreloader, hidePreloader} from 'wonder-ui/Preloader';
import {inject, observer} from 'mobx-react';

@inject('UIState')
@observer
export default class IndexPage extends Component {

  showPreloader = ()=>{
    showPreloader();

    setTimeout(()=>{
      hidePreloader();
    }, 1000);
  }

  render() {
    return (
      <Page title="首页">
        <PageContent>
          <GridRow>
            <GridCol width={50}>
              <Button onClick={this.showPreloader}>showPreloader</Button>
            </GridCol>
            <GridCol width={50}>
              <Link to="other">下一页</Link>
            </GridCol>
          </GridRow>
        </PageContent>
      </Page>
    );
  }
}
