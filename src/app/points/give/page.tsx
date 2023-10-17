'use client';

import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import { useCallback, useEffect, useRef, useState } from 'react';
import { checkIfNco, givePoint, searchPossiblePointsReceiver } from './actions';
import { useRouter } from 'next/navigation';

export default function GivePointFormPage() {
  const [merit, setMerit] = useState(1);
  const [form] = Form.useForm();
  const router = useRouter();
  const query = Form.useWatch('receiverId', { form, preserve: true });
  const [options, setOptions] = useState<{ name: string; sn: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    checkIfNco();
  }, []);

  const renderPlaceholder = useCallback(
    ({ name, sn }: { name: string; sn: string }) => (
      <div className='flex flex-row justify-between'>
        <span className='text-black'>{name}</span>
        <span className='text-black'>{sn}</span>
      </div>
    ),
    [],
  );

  useEffect(() => {
    setSearching(true);
    searchPossiblePointsReceiver(query).then((value) => {
      setSearching(false);
      setOptions(value as any);
    });
  }, [query]);

  const handleSubmit = useCallback(
    (form: any) => {
      if (!form?.givenAt?.$d) {
        return message.error('날짜를 입력해주세요');
      }
      setLoading(true);
      givePoint({
        ...form,
        value: merit * form.value,
        givenAt: (form.givenAt.$d as Date).toISOString(),
      })
        .then(() => {
          message.success('상벌점 성공적으로 했습니다');
          router.push('/points');
        })
        .catch((e) => {
          if ((e as any)?.message) {
            message.error(JSON.parse((e as any).message)?.message);
          } else {
            message.error(String(e));
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [router, merit],
  );
  //상점 목록과 대응값
  const meritData = [
    {id = 1, name : '상점 1', value: 5},
    {id = 2, name : '상점 2', value: 3}
  ];
  //벌점 목록과 대응값
  const demeritData = [
    {id = 1, name : '벌점 1', value : -5},
    {id = 2, name : '벌점 2', value : -3}
  ];

  return (
    <div className='px-4'>
      <div className='my-5' />
      <Form
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name='givenAt'
          label='받은 날짜'
          colon={false}
        >
          <DatePicker
            placeholder='상벌점을 받은 날짜를 선택해주세요'
            picker='date'
            inputReadOnly
            locale={locale}
          />
        </Form.Item>
        <Form.Item<string>
          label='수령자'
          name='receiverId'
          rules={[
            { required: true, message: '수령자를 입력해주세요' },
            { pattern: /^[0-9]{2}-[0-9]{5,8}$/, message: '잘못된 군번입니다' },
          ]}
        >
          <AutoComplete
            options={options.map((t) => ({
              value: t.sn,
              label: renderPlaceholder(t),
            }))}
          >
            <Input.Search loading={searching} />
          </AutoComplete>
        </Form.Item>
        <Form.Item 
          name='merit' 
          label='상점'
        >
          <Select 
            placeholder='상점을 선택해주세요'
          >
            {meritData.map((merit) => (
              <Select.Option key={merit.id.toString()} value={merit.id.toString()}>
                {`${merit.name} (${merit.value > 0 ? `+${merit.value}` : 0})`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item 
          name='demerit' 
          label='벌점'
        >
          <Select 
            placeholder='벌점을 선택해주세요'
            >
              {demeritData.map((demerit) => (
                <Select.Option key={demerit.id.toString()} value={demerit.id.toString()}>
                  {`${demerit.name} (${demerit.value > 0 ? 0 : demerit.value})`}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item<string>
          name='reason'
          rules={[{ required: true, message: '지급이유를 입력해주세요' }]}
        >
          <Input.TextArea
            showCount
            maxLength={500}
            placeholder='상벌점 지급 이유'
            style={{ height: 150 }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            ghost={false}
            htmlType='submit'
            type='primary'
            loading={loading}
          >
            부여하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
