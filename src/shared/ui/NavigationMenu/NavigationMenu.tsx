'use client';

import Link from 'next/link';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { NavigationMenuContainer } from './NavigationMenuContainer';
import { NavigationMenuList } from './NavigationMenuList';
import { NavigationMenuTrigger } from './NavigationMenuTrigger';
import { NavigationMenuContent } from './NavigationMenuContent';
import { NavigationMenuListItem } from './NavigationMenuListItem';

import { navigationMenuTriggerStyle } from './NavigationMenu.utils';

import type { NavigationMenuItems } from './NavigationMenu.types';
import type { ComponentProps } from 'react';

interface IProps extends ComponentProps<typeof NavigationMenuContainer> {
  items: NavigationMenuItems;
  className?: string;
}

const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuLink = NavigationMenuPrimitive.Link;

export function NavigationMenu(props: IProps) {
  const { items = [], className, ...restProps } = props;

  return (
    <NavigationMenuContainer {...restProps} className={className}>
      <NavigationMenuList>
        {items.map((item, i) => {
          return (
            <NavigationMenuItem key={i}>
              {item.type === 'pure' && item.content}

              {item.type === 'simple' && (
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={item.content.href}>{item.content.label}</Link>
                </NavigationMenuLink>
              )}

              {item.type === 'extended' && (
                <>
                  <NavigationMenuTrigger>
                    {item.triggerLabel}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                      {item.content.map(el => {
                        return (
                          <NavigationMenuListItem
                            key={el.label}
                            title={el.label}
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
