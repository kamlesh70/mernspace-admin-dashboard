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
          <>
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
                      name={`price.${name}.${option}`}
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
          </>
        );
      })}
    </>
  );
}

export default PriceConfiguration;
