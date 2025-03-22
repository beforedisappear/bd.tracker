'use client';

import Link from 'next/link';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { NavigationMenuContainer } from './NavigationMenuContainer';
import { NavigationMenuList } from './NavigationMenuList';
import { NavigationMenuTrigger } from './NavigationMenuTrigger';
import { NavigationMenuContent } from './NavigationMenuContent';
import { NavigationMenuListItem } from './NavigationMenuListItem';

import { navigationMenuTriggerStyle } from './NavigationMenu.utils';

type PureListItem = { type: 'pure'; content: React.ReactNode };

type SimpleListitem = { label: React.ReactNode; href: string };

type ListItem = { title: string; href: string; description?: string };

type SimpleItem = { type: 'simple'; content: SimpleListitem };

type ExpandedItem = {
  type: 'expanded';
  trigger: React.ReactNode;
  content: ListItem[];
};

interface IProps {
  items: (PureListItem | SimpleItem | ExpandedItem)[];
  className?: string;
  childrenBeforeList?: React.ReactNode;
  childrenAfterItemList?: React.ReactNode;
}

const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuLink = NavigationMenuPrimitive.Link;

export function NavigationMenu(props: IProps) {
  const { items = [], className } = props;

  return (
    <NavigationMenuContainer className={className}>
      <NavigationMenuList>
        {items.map((item, i) => {
          return (
            <NavigationMenuItem key={i}>
              {item.type === 'pure' && item.content}

              {item.type === 'simple' && (
                <Link href={item.content.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.content.label}
                  </NavigationMenuLink>
                </Link>
              )}

              {item.type === 'expanded' && (
                <>
                  <NavigationMenuTrigger>{item.trigger}</NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                      {item.content.map(el => {
                        return (
                          <NavigationMenuListItem
                            key={el.title}
                            title={el.title}
                            href={el.href}
                          >
                            {el.description}
                          </NavigationMenuListItem>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenuContainer>
  );
}
