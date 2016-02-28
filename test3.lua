local procfs = require("lj2procfs.procfs")
local putil = require("lj2procfs.print-util")

local function USAGE()
	print ([[

USAGE: 
	$ sudo ./procfile [PID] <filename>

where <filename> is the name of a file in the /proc
directory.

Example:
	$ sudo ./procfile cpuinfo
	$ sudo ./procfile 13654 limits
]])

	error() 
end

local filename = nil
local PID = nil

if tonumber(arg[1]) then
	PID = tonumber(arg[1])
	filename = arg[2]
else
	filename = arg[1]
end

if not filename then USAGE() end


print("return {")
if PID then
	putil.printValue(procfs[PID][filename], '    ', tostring(PID).."_"..filename)
else
	putil.printValue(procfs[filename], "    ", filename)
end
print("}")
