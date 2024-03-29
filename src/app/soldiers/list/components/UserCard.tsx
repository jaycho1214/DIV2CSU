import { Card } from 'antd';
import Link from 'next/link';

export type UserCardProps = {
  sn: string;
  name: string;
  type: string;
  deleted_at: Date | null;
  rejected_at: Date | null;
};

export function UserCard({ type, sn, name, deleted_at, rejected_at }: UserCardProps) {
  if (deleted_at && rejected_at) {
    return null; // deleted_at, rejected_at 값이 존재할 경우 카드를 null로 반환하여 숨김
}
  return (
    <Link href={`/soldiers?sn=${sn}`}>
      <Card className='my-1 mx-1'>
        <div className='flex flex-row items-center justify-between'>
          <p className='font-bold'>
            {type === 'enlisted' ? '용사' : '간부'} {name}
          </p>
          <p>{'**-' + '*'.repeat(sn.length - 6) + sn.slice(-3)}</p>
        </div>
      </Card>
    </Link>
  );
}
