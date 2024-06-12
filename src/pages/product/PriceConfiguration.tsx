import { Col, Form, Input, Row, Typography } from 'antd';
import { IPriceConfiguration } from './types';

type Props = {
  data: IPriceConfiguration;
};

function PriceConfiguration({ data }: Props) {
  console.log(data, 'IPriceConfiguration');
  return (
    <>
      {Object.entries(data)?.map(([name, value]: [string, any]) => {
        return (
          <div key={name}>
            <Row style={{ marginBottom: '16px' }}>
              <Col span={24}>
                <Typography>
                  {name} ({value?.priceType})
                </Typography>
              </Col>
            </Row>
            <Row gutter={16}>
              {value?.availableOptions?.map((option: string) => {
                return (
                  <Col span={8}>
                    <Form.Item
                      name={`priceConfigurations.${name}.availableOptions.${option}`}
                      label={option}
                      rules={[
                        { required: true, message: 'Please enter price' },
                      ]}
                    >
                      <Input
                        placeholder="Enter price"
                        addonAfter="₹"
                        type="number"
                      />
                    </Form.Item>
                  </Col>
                );
              })}
            </Row>
          </div>
        );
      })}
    </>
  );
}

export default PriceConfiguration;
