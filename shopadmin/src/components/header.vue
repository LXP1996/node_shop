<template>
  <header class="header">
    <el-row type="flex">
      <nav>
        <ul>
          <li>
            <i class="el-icon-setting"></i>&nbsp;商城管理系统
          </li>
        </ul>
      </nav>
      <ul>
        <li>
            <el-badge value="1" type="info">
                <i class="el-icon-bell"></i>
            </el-badge>
          
        </li>
        <li><i class="el-icon-message"></i></li>
        <li>
          <i class="el-icon-username"></i>&nbsp;root
        </li>
        <li>
          <i class="el-icon-circle-close-outline"></i>&nbsp;退出
        </li>
      </ul>
    </el-row>
  </header>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
@mixin align-center {
  //垂直居中
  display: flex;
  align-items: center;
}
@mixin space-around {
  //坏绕居中
  display: flex;
  justify-content: space-between;
}
@mixin ul {
  @include align-center;
  list-style-type: none;
  margin-right: 60px;
  li {
    @include align-center;
    cursor: pointer;
    margin-left: 35px;
  }
}

.header {
  background: #2f333e;
  width: 100%;
  color: #f2f6fc;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  .el-row {
    @include space-around;
  }
  nav {
    @include ul;
  }
  ul {
    @include ul;
  }
}
</style>
