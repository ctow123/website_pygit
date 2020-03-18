def combinations(iterable, r):
    # combinations('ABCD', 2) --> AB AC AD BC BD CD
    # combinations(range(4), 3) --> 012 013 023 123
    pool = tuple(iterable)
    n = len(pool)
    if r > n:
        return
    indices = range(r)
    yield tuple(pool[i] for i in indices)
    while True:
        for i in reversed(range(r)):
            if indices[i] != i + n - r:
                break
        else:
            return
        indices[i] += 1
        for j in range(i+1, r):
            indices[j] = indices[j-1] + 1
        yield tuple(pool[i] for i in indices)

def main():
     print("hello world")

if __name__ == "__main__":
    print(dir(combinations(range(4),3)))
    for x in combinations(range(4),3):
        print(x)
    # print(*combinations(range(4),3), sep='\n')
    # for x in range(3,3):
    #     print(x)
    #     print(x)
    # for i in reversed(range(3)):
    #     print(i)
    # print(combinations(range(4),3))
