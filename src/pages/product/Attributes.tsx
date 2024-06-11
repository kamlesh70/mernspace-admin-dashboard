import { Form, Radio, Switch } from 'antd';
import { IAttribute } from './types';

type Props = {
  data: IAttribute[];
};

function Attributes({ data }: Props) {
  console.log(data, 'IAttribute');
  return (
    <>
      {data?.map((attribute: IAttribute) => {
        return (
          <>
            {attribute?.widgetType === 'radio' ? (
              <Form.Item
                name={`attribute.${attribute?.name}`}
                label={attribute?.name}
              >
                <Radio.Group
                  options={attribute?.availableOptions?.map((option) => {
                    return {
                      label: option,
                      value: option,
                    };
                  })}
                  defaultValue={attribute?.defaultValue}
                  // onChange={onChange3}
                  optionType="button"
                />
              </Form.Item>
            ) : attribute?.widgetType === 'switch' ? (
              <Form.Item
                name={`attribute.${attribute?.name}`}
                label={attribute?.name}
              >
                <Switch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  defaultValue={
                    attribute?.defaultValue === 'yes' ? true : false
                  }
                />
              </Form.Item>
            ) : null}
          </>
        );
      })}
    </>
  );
}

export default Attributes;
