import GridComponent from '@amaii/ui-framework';

// import FormComponent from '../form';

const nonAlphaNumeric = /[^a-zA-Z0-9]/g;

class UIModel {
    constructor(modelConfig) {
        const { title, controllerType } = modelConfig;
        let { api, idProperty = `${api}Id` } = modelConfig;
        if (!api) {
            api = `${title.replaceAll(nonAlphaNumeric, '-').toLowerCase()}`;
            idProperty = `${title.replaceAll(' ', '')}Id`;
        }
        api = controllerType === 'cs' ? `${api}.ashx` : `internal-reporting/api/${api}`;
        Object.assign(this, { standard: true, idProperty, ...modelConfig, api });
    }

    Grid = ({ columns, rows }) => <GridComponent columns={columns} rows={rows} model={this} />

    // Form = ({ columns }) => <FormComponent columns={columns} model={this} />
}

export default UIModel;