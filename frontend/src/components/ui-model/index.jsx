import GridComponent from '../grid';
import FormComponent from '../form';

const nonAlphaNumeric = /[^a-zA-Z0-9]/g;

class UIModel {
  constructor(modelConfig) {
    const { title } = modelConfig;
    let { api, idProperty = `${api}Id` } = modelConfig;
    if (!api) {
      api = `${title.replaceAll(nonAlphaNumeric, '-').toLowerCase()}`;
      idProperty = `${title.replaceAll(' ', '')}Id`;
    }
    api = `internal-reporting/api/${api}`;
    Object.assign(this, { standard: true, idProperty, ...modelConfig, api });
  }

  Grid = ({ ...props }) => <GridComponent model={this} {...props} />;

  Form = ({ columns }) => {
    const abc = 10;
    return <FormComponent columns={columns} model={this} abc={abc} />;
  };
}

export default UIModel;
