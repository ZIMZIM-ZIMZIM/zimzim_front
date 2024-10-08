import React, { SVGProps, FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

interface MenuItemProps {
  to: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
}

const MenuItem = ({ to, Icon, title }: MenuItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      clsx(
        'group flex flex-row h-12 p-2 items-center gap-3 rounded-lg max-md:px-4',
        {
          'bg-secondary-light text-white': isActive,
          'hover:bg-secondary-light/70 hover:text-white text-gray-600':
            !isActive,
        },
      )
    }
  >
    {({ isActive }) => (
      <>
        <Icon
          className={clsx(
            'group-hover:text-white w-7 h-7 md:w-5 md:h-5 lg:w-7 lg:h-7',
            {
              'text-white': isActive,
              'text-gray-600': !isActive,
            },
          )}
        />

        <p className="text-xl md:text-sm hidden md:block lg:text-lg">{title}</p>
      </>
    )}
  </NavLink>
);

export default MenuItem;
