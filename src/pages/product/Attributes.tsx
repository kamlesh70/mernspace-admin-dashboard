import { Form, Radio, Switch } from 'antd';
import { IAttribute } from './types';

type Props = {
  data: IAttribute[];
  form: any;
};

function Attributes({ data }: Props) {
  console.log(data, 'IAttribute');
  return (
    <>
      {data?.map((attribute: IAttribute) => {
        return (
          <div key={attribute?.name}>
            {attribute?.widgetType === 'radio' ? (
              <Form.Item
                name={`attributes.${attribute?.name}`}
                label={attribute?.name}
                initialValue={attribute?.defaultValue}
              >
                <Radio.Group
                  options={attribute?.availableOptions?.map((option) => {
                    return {
                      label: option,
                      value: option,
                    };
                  })}
                  // onChange={onChange3}
                  optionType="button"
                />
              </Form.Item>
            ) : attribute?.widgetType === 'switch' ? (
              <Form.Item
                name={`attributes.${attribute?.name}`}
                label={attribute?.name}
                initialValue={attribute?.defaultValue === 'yes' ? true : false}
              >
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

export default Attributes;
