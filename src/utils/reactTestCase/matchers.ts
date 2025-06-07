export const jestMatchersWithValues = [
'toContainElement', 'toContainHTML' , 'toHaveAttribute','toHaveClass','toHaveFormValues','toHaveStyle', 'toHaveTextContent', 'toBe','toHaveBeenCalledTimes','toHaveBeenCalledWith',
'toHaveBeenLastCalledWith','toHaveBeenNthCalledWith','toHaveReturnedTimes','toHaveReturnedWith','toHaveLastReturnedWith','toHaveNthReturnedWith','toHaveLength','toHaveProperty','toBeCloseTo',
'not.toBeCloseTo','toBeGreaterThan','toBeGreaterThanOrEqual','toBeLessThan','toBeLessThanOrEqual','toBeInstanceOf','toContain','toContainEqual','toEqual','toMatch','toMatchObject','toMatchSnapshot',
'toMatchInLineSnapshot','toStrictEqual','toThrow','toThrowErrorMatchingSnapshot','toThrowErrorMatchingInLineSnapshot','not.toBeInstanceOf','not.toContain','not.toEqual','not.toContainEqual',
'not.toMatch','not.toMatchObject','not.toMatchSnapshot','not.toMatchInLineSnapshot','not.toStrictEqual','not.toThrow','not.toThrowErrorMatchingSnapshot','not.toThrowErrorMatchingInLineSnapshot',
'not.toBeLessThan','not.toBeLessThanOrEqual','not.toBeGreaterThanOrEqual','not.toBeGreaterThan','not.toHaveProperty','not.toHaveLength','not.toHaveNthReturnedWith','not.toHaveReturnedWith','not.toBe',
'not.toHaveBeenCalledTimes','not.toHaveBeenCalledWith','not.toHaveBeenLastCalledWith','not.toHaveBeenNthCalledWith','not.toHaveReturnedTimes','not.toContainElement', 'not.toContainHTML',
'not.toHaveAttribute','not.toHaveClass','not.toHaveFormValues', 'not.toHaveStyle','not.toHaveTextContent'
] as const


export const mochaMatchersWithValues  = [
'to.have.text','to.exist','to.have.html','to.contain','to.have.attribute','to.have.class','to.have.style','to.match','to.be.empty','to.be.visible','to.have.focus','to.be',
'to.have.lengthOf','to.have.property','to.be.closeTo','to.be.undefined','to.be.ok','to.be.above','to.be.at.least','to.be.at.most','to.be.below','to.be.instanceOf','to.be.null','to.be.ok','to.be.undefined',
'to.be.nan','to.include','toContainEqual','to.equal','to.match','to.throw', 'should.be.disabled', 'should.be.visible' , 'should.not.have.value'
] as const


export const sinonMatchersWithValues = [
'called','callCount','calledWith','neverCalledWith','returned'
] as const


export const cypressMatchersWithValues  = [
'should.have.text','should.have.value','should.contain','should.have.attr','should.have.class','should.have.css','should.have.length','should.include',
'should.eq','should.not.have.value',
] as const

export const cypressMatchersWithoutValue  = [
'should.be.disabled','should.be.visible','should.not.be.visible',
'should.not.exist',
] as const








// inferred types
export type JestMatcherType = typeof jestMatchersWithValues[number];
export type MochaMatcherType = typeof mochaMatchersWithValues [number];
export type SinonMatcherType = typeof sinonMatchersWithValues[number];
export type CypressMatcherWVType = typeof cypressMatchersWithValues[number];
export type CypressMatcherWNVType = typeof cypressMatchersWithoutValue[number];

// Union over all
export type AnyMatcherType = 
| JestMatcherType | MochaMatcherType 
| SinonMatcherType | CypressMatcherWVType
| CypressMatcherWNVType
;
