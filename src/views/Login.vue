<template>
  <v-img
    class="fill-height"
    src="https://cdn.pixabay.com/photo/2015/06/08/15/11/typewriter-801921_1280.jpg"
    :aspect-ratio="16 / 9"
    height="100vh"
    width="100vw"
    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
  >
    <v-container fill-height fluid>
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="12" md="8" lg="6" xl="4">
          <v-card elevation="12" class="py-8">
            <v-card-title>
              <v-row justify="center">
                <h2 class="text-h4 black--text font-weight-bold">
                  登陆我们的系统
                </h2>
              </v-row>
            </v-card-title>
            <v-card-text class="text-center">
              <div class="mt-6">
                <v-row justify="center">
                  <v-col cols="12" md="10">
                    <v-text-field
                      label="输入电子邮件地址"
                      solo
                      flat
                      outlined
                      prepend-inner-icon="mdi-account-outline"
                      hide-details
                    ></v-text-field>

                    <v-text-field
                      label="密码"
                      solo
                      flat
                      outlined
                      prepend-inner-icon="mdi-lock-open"
                      hide-details
                      class="mt-6"
                    ></v-text-field>

                    <div class="d-flex align-center justify-space-between mt-4">
                      <v-checkbox label="记住我的账号"></v-checkbox>

                      <div class="primary--text text-subtitle-1">
                        忘记密码？
                      </div>
                    </div>

                    <div class="mt-6">
                      <v-btn block class="text-capitalize" large color="primary"
                        >登陆</v-btn
                      >
                    </div>

                    <div class="mt-6">
                      <div class="mt-6">
                        还没有注册？
                        <span class="primary--text text-subtitle-1"
                          >注册账号</span
                        >
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<style lang="stylus"></style>
