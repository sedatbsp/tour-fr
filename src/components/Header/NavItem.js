import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { userService } from "src/services";
import jwt_decode from "jwt-decode";
const NavItem = ({ navItem = {} }) => {
  const router = useRouter();
  const { pathname } = useRouter();

  const [user, setUser] = useState(null);

  const { name, href, subNavItems } = navItem;
  const subHref = subNavItems.map((item) => item.href);
  const current = pathname === href || subHref.includes(pathname);
  /*
    useEffect(() => {
      // redirect to home if already logged in
      if (userService.userValue) {
        router.push('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    */
/*
  console.log(userService.userValue)
  var token = userService.userValue.data;
  var decoded = await jwt_decode(token);
  console.log(decoded);
/*
  useEffect(() => {
    const subscription = userService.user.subscribe(x => setUser(x));
    return () => subscription.unsubscribe();
  }, []);
*/
  const logout = () => {
    userService.logout();
  }
  /*
    // only show nav when logged in
    if (!user) return null;
  */
  return (
    <li className={`dropdown${current ? " current" : ""}`}>
      <Link href={href}>
        <a href={href}>{name}</a>
      </Link>
      <ul>
        {subNavItems.map((subItem) => (
          <li
            className={subItem.subItems?.length ? "dropdown" : ""}
            key={subItem.id}
          >
            <Link href={subItem.href}>
              <a href={href} onClick={subItem.name === 'Logout' && logout} >{subItem.name}</a>
            </Link>
            <ul>
              {subItem.subItems?.map((item) => (
                <li key={item.id}>
                  <Link href={item.href}>
                    <a href={href}>{item.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default NavItem;
