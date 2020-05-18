# @nextcloud/push

[![Build Status](https://travis-ci.com/nextcloud/nextcloud-push.svg?branch=master)](https://travis-ci.com/nextcloud/nextcloud-push)
[![npm](https://img.shields.io/npm/v/@nextcloud/push.svg)](https://www.npmjs.com/package/@nextcloud/push)
[![Documentation](https://img.shields.io/badge/Documentation-online-brightgreen)](https://nextcloud.github.io/nextcloud-push/)

Receive push notifications from Nextcloud.

## Installation

```
npm i -S @nextcloud/push
```

## Usage

```js
import { connect } from '@nextcloud/push'

const connection = connect(
    'mail',
    'folder/INBOX',
    'gerda',
    e => console.info(e)
)

connection.close()
```
