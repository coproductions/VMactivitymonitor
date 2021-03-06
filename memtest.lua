#!/usr/bin/env luajit

--[[
	This lua script acts similar to the 'free' command, which will
	display some interesting information about how much memory is being
	used in the system.

	This example assumes lj2procfs is installed into the lua path
--]]


local procfs = require("lj2procfs.procfs")

local printJson = require("json_util")
local meminfo = procfs.meminfo;


local memtotal = meminfo.MemTotal.size
local memfree = meminfo.MemFree.size
local memused = memtotal - memfree
local memshared = meminfo.Shmem.size
local membuffers = meminfo.Buffers.size
local memcached = meminfo.Cached.size

local swaptotal = meminfo.SwapTotal.size
local swapfree = meminfo.SwapFree.size
local swapused = swaptotal - swapfree

-- print(string.format("%18s %10s %10s %10s %10s %10s",'total', 'used', 'free', 'shared', 'buffers', 'cached'))
-- print(string.format("Mem: %13d %10d %10d %10d %10d %10d", memtotal, memused, memfree, memshared, membuffers, memcached))
--print(string.format("-/+ buffers/cache: %10d %10d", 1, 2))
printJson.printValue(meminfo)
