
local function literalForValue(avalue)
  if type(avalue) == "number" or type(avalue) == "boolean" then
    return tostring(avalue)
  end

  local str = tostring(avalue)
  if str == "" then
    return "''"
  end

  return string.format("%s", str)
end

local data = ""

local function printValue(avalue, indent, name)
  if not avalue then return end;

  indent = indent or ""


  if type(avalue) == "table" then
-- define a counter
	local length = 0
	local counter = 0
    if name then
      data = data..string.format('%s"%s" : {', indent, name)
      print(string.format('%s"%s" : {', indent, name))
    else
      data = data..string.format("%s{", indent)

      print(string.format("%s{", indent))
    end

    if #avalue > 0 then
      -- it's a list,so use ipair
--first get table length
	for _,value in ipairs(avalue) do
	length = length + 1
	end
	--print('length in ipairs',length)
      for _, value in ipairs(avalue) do
	counter_ipair = counter_ipair + 1
        printValue(value, indent..'    ')
	if counter < length then
    data = data..string.format("%s},", indent)
		print(string.format("%s},", indent))
	else
    data = data..string.format("%s}", indent))
	 	print(string.format("%s}", indent))
        end
       end
    else
      -- assume it's a dictionary, so use pairs
	 for key,value in pairs(avalue) do
          length = length + 1
         end
	 --print('length in pairs',length)
      for key, value in pairs(avalue) do
	counter = counter + 1
        printValue(value, indent..'    ', key)
	    if counter < length then
        data = data..string.format(",", indent)
        print(string.format(",", indent))
        else
          data = string.format("%s}", indent)
          print(string.format("%s}", indent))
        end
      end
    end
   -- print(string.format("%s},", indent))
  else
    if name then
      data = data..string.format('%s"%s" :  "%s"', indent, name, literalForValue(avalue))
      print(string.format('%s"%s" :  "%s"', indent, name, literalForValue(avalue)))
    else
      data = data..string.format("%s%s", indent, literalForValue(avalue))
      print(string.format("%s%s", indent, literalForValue(avalue)))
    end
  end

end

-- return {
--   printValue = printValue;
-- }

-- Opens a file in append mode
local file = io.open("testData.json", "a")


-- sets the default output file as test.lua
-- io.output(file)

-- appends a word test to the last line of the file
io.write(data)

-- closes the open file
io.close(file)
