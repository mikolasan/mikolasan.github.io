---
path: /blog/center-window-in-weston
date: 2021-07-24
title: Center window in Weston
published: 2021-10-14
lastModified: 2021-10-14
---

I found so many questions on StackOverflow without answer regarding this problem:

- https://stackoverflow.com/questions/47973666/how-to-center-a-qmainwindow (works only in Xorg)
- https://stackoverflow.com/questions/33462134/how-to-position-apps-inside-weston-compositor
- https://stackoverflow.com/questions/35633817/how-do-i-set-the-x-y-coordinates-of-a-window-in-wayland
- https://stackoverflow.com/questions/39989704/how-to-extend-wayland-weston-to-control-x-y-position-of-a-window-surface

I even has started thinking about switching over to another compositor https://stackoverflow.com/questions/37730940/qt5-on-wayland-without-weston

But I successfully found a way to control the x,y position through **weston/desktop-shell/shell.c** in `weston_view_set_initial_position(...)`. Now all windows appear centered.

```diff
diff --git a/desktop-shell/shell.c b/desktop-shell/shell.c
index f126393a..b494708b 100644
--- a/desktop-shell/shell.c
+++ b/desktop-shell/shell.c
@@ -4331,16 +4331,8 @@ weston_view_set_initial_position(struct weston_view *view,
         */
        get_output_work_area(shell, target_output, &area);

-       x = area.x;
-       y = area.y;
-       range_x = area.width - view->surface->width;
-       range_y = area.height - view->surface->height;
-
-       if (range_x > 0)
-               x += random() % range_x;
-
-       if (range_y > 0)
-               y += random() % range_y;
+       x = area.x + floor((view->surface->width - area.width) / 2.);
+       y = area.y + floor((view->surface->height - area.height) / 2.);

        weston_view_set_position(view, x, y);
 }
```