# [bx] 和 loop 指令

## [bx] 内存寻址

`[bx]` 表示一个内存单元：段地址在 `DS` 中，偏移地址在 `BX` 中。

```asm
mov ax, [bx]    ; 读取 DS:BX 处的字（2 字节），因为 ax 是 16 位寄存器
mov al, [bx]    ; 读取 DS:BX 处的字节（1 字节），因为 al 是 8 位寄存器
mov ax, [0]     ; 读取 DS:0 处的字
```

> 在**汇编源程序**中，`mov ax, [0]` 会被编译器处理为 `mov ax, 0`（常量 0）。
> 要访问内存，必须用 `[bx]` 或显式写段寄存器前缀：`mov ax, ds:[0]`。

## 描述符号约定

| 符号             | 含义                                    |
| ---------------- | --------------------------------------- |
| `(ax)`           | ax 寄存器中的内容                       |
| `(20000H)`       | 内存 20000H 单元的内容                  |
| `((ds)*16+(bx))` | 以 ds 为段地址，bx 为偏移的内存单元内容 |
| `idata`          | 代表任意常量（立即数）                  |

## loop 指令

```asm
loop 标号
```

CPU 执行 `loop` 的两个步骤：

1. `(cx) = (cx) - 1`
2. 若 `(cx) ≠ 0`，跳转到标号处执行；若 `(cx) = 0`，向下执行

**使用模板：**

```asm
mov cx, 循环次数
s:
    ; 循环体
    loop s
```

**示例：计算 2¹²**

```asm
assume cs:code

code segment
start:
    mov ax, 2
    mov cx, 11          ; 循环 11 次，从 2 开始连续翻倍 = 2^12
s:
    add ax, ax          ; ax = ax * 2
    loop s              ; cx--, 若 cx≠0 跳回 s

    mov ax, 4c00h
    int 21h
code ends
end start
```

## Debug 与汇编源程序对 `[idata]` 的不同处理

```
Debug 中:  mov ax,[0]  → 从内存 ds:0 处读数据（地址）
源程序中:  mov ax,[0]  → 等同于 mov ax,0（常量 0，非内存访问）
```

**在源程序中访问内存的两种正确写法：**

```asm
; 方式一：将偏移地址放入 bx
mov ax, 2000h
mov ds, ax
mov bx, 0
mov al, [bx]            ; 访问 2000:0

; 方式二：显式写出段寄存器前缀
mov ax, 2000h
mov ds, ax
mov al, ds:[0]          ; 访问 2000:0
```

| 指令              | 含义                                  |
| ----------------- | ------------------------------------- |
| `mov al, [0]`     | `al = 0`，常量（与 `mov al, 0` 相同） |
| `mov al, ds:[0]`  | `al = 内存 (ds*16+0)` 处的字节        |
| `mov al, [bx]`    | `al = 内存 (ds*16+bx)` 处的字节       |
| `mov al, ds:[bx]` | 同上                                  |

## loop 与 [bx] 联合应用

**任务：** 计算 `FFFF:0 ~ FFFF:B`（12 字节）的数据之和，结果存入 `dx`

```asm
assume cs:code

code segment
start:
    mov ax, 0ffffh
    mov ds, ax          ; ds = FFFFh
    mov bx, 0           ; 从 FFFF:0 开始
    mov dx, 0           ; sum = 0
    mov cx, 0ch         ; 循环 12 次

s:
    mov al, ds:[bx]     ; 读取一个字节
    mov ah, 0           ; 清空高字节，将 8 位扩展为 16 位
    add dx, ax          ; 累加
    inc bx              ; bx++
    loop s

    mov ax, 4c00h
    int 21h
code ends
end start
```

> **为什么不能直接 `add dx, ds:[bx]`？** 因为内存字节（8 位）不能直接加到 16 位寄存器 dx——字节需要先零扩展到 16 位（将 ah 清零）。

## 在 Debug 中跟踪 loop 程序

**任务：** 计算 `FFFF:0006` 单元中的数乘以 3，结果存入 `dx`

```asm
assume cs:code

code segment
    mov ax, 0ffffh
    mov ds, ax
    mov bx, 6           ; ds:bx 指向 ffff:6

    mov al, [bx]
    mov ah, 0           ; ax = ffff:6 处的字节（零扩展）

    mov dx, 0           ; 累加清零
    mov cx, 3           ; 循环 3 次

s:
    add dx, ax
    loop s              ; dx = ax * 3

    mov ax, 4c00h
    int 21h
code ends
end
```

Debug 中跟踪时，用 `-t` 单步执行，用 `-r` 查看每步寄存器变化，用 `-d ffff:0` 查看该段内存原始值。
