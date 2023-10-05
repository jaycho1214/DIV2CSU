'use client';
import { useLayoutEffect, useState } from 'react';
import { fetchTotalPoints } from '@/app/points/actions';
import { Card, Row, Skeleton, Statistic } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { FetchTotalPointsData } from '@/app/points/interfaces';
import { Soldier } from '@/interfaces';

export function TotalPointBox({ user }: { user: Soldier }) {
  const [data, setData] = useState<FetchTotalPointsData | null>(null);

  useLayoutEffect(() => {
    fetchTotalPoints(user.sn).then((d) => setData(d));
  }, [user.sn]);

  var meritPoint = 0;
  var deMeritPoint = 0;

  if (data.verifiedPoint < 0) {
    deMeritPoint += data.verifiedPoint;
  } else {
    meritPoint += data.verifiedPoint;
  }
  return (
    <Row>
      <Card className='flex-1'>
        <Skeleton
          paragraph={{ rows: 1 }}
          active
          loading={data?.unverifiedPoint == null}
        >
          <Statistic
            title='미승인 상점'
            value={`${data?.unverifiedPoint}점`}
            prefix={<CloseOutlined />}
            valueStyle={{ color: '#3f8600' }}
          />
        </Skeleton>
      </Card>
      <Card className='flex-1'>
        <Skeleton
          paragraph={{ rows: 1 }}
          active
          loading={data?.verifiedPoint == null}
        >
          <Statistic
            title='승인 상점'
            value={`${meritPoint}점`}
            prefix={<CheckOutlined />}
            valueStyle={{ color: '#cf1322' }}
          />
        </Skeleton>
      </Card>
      <Card className='flex-1'>
        <Skeleton
          paragraph={{ rows: 1 }}
          active
          loading={data?.verifiedPoint == null}
        >
          <Statistic
            title='승인 벌점'
            value={`${deMeritPoint}점`}
            prefix={<CheckOutlined />}
            valueStyle={{ color: '#cf1322' }}
          />
        </Skeleton>
      </Card>
    </Row>
  );
}
