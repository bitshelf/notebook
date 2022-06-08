---
tags: Android 
---

## xml 注释
```xml:packages/apps/Launcher3/res/layout/search_container_workspace.xml
    <!-- <fragmentandroid:name="com.android.launcher3.qsb.QsbContainerView$QsbFragment"
        android:layout_width="match_parent"
        android:tag="qsb_view"
        android:layout_height="match_parent"/> -->
```

## java 文件修改
```java:packages/apps/Launcher3/src/com/android/launcher3/Workspace.java
        // CellLayout.LayoutParams lp = new CellLayout.LayoutParams(0, 0, firstPage.getCountX(), 1);
        // lp.canReorder = false;
        // if (!firstPage.addViewToCellLayout(qsb, 0, R.id.search_container_workspace, lp, true)) {
        //     Log.e(TAG, "Failed to add to item at (0, 0) to CellLayout");
        // }

```
