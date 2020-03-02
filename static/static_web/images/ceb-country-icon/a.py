#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os

for root, dirs, files in os.walk(".", topdown=False):
	for f in files:
		if '_48' in f:
			os.rename(f,f[:-7]+'.png')