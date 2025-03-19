interface Props {}

interface Stat {
  quantity: string;
  description: string;
}

export function AboiutProjectStatistics({}: Props) {
  const statList: Stat[] = [
    {
      quantity: '2.7K+',
      description: 'Users',
    },
    {
      quantity: '1.8K+',
      description: 'Subscribers',
    },
    {
      quantity: '112',
      description: 'Downloads',
    },
    {
      quantity: '4',
      description: 'Products',
    },
  ];

  return (
    <section id='statistics'>
      <div
        className='grid grid-cols-4 gap-8 
        lg:grid-cols-2'
      >
        {statList.map(({ quantity, description }: Stat) => (
          <div key={description} className='space-y-0.5 text-center'>
            <h2 className='text-4xl font-bold sm:text-2xl'>{quantity}</h2>
            <p className='text-xl text-muted-foreground sm:text-base'>
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
